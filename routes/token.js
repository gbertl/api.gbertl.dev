const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { generateToken } = require('../utils');
const User = require('../models/User');
const { ACCESS, REFRESH } = require('../tokenTypes');

const router = express.Router();

router.post('/', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  if (user === null) return res.sendStatus(401);

  if (await bcrypt.compare(req.body.password, user.password)) {
    const access = generateToken(user._id, ACCESS);
    const refresh = generateToken(user._id, REFRESH);
    res.json({ access, refresh });
  } else {
    res.sendStatus(401);
  }
});

router.post('/refresh', async (req, res) => {
  const refreshToken = req.body.refresh;
  if (refreshToken === null) return res.sendStatus(401);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(401);
    const access = generateToken(user.userId, ACCESS);
    res.json({ access });
  });
});

module.exports = router;
