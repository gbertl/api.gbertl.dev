const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

const { generateAccessToken } = require('../utils');
const User = require('../models/User');

router.post('/', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  if (user === null) return res.sendStatus(401);

  if (await bcrypt.compare(req.body.password, user.password)) {
    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ access: accessToken, refresh: refreshToken });
  } else {
    res.sendStatus(401);
  }
});

router.post('/refresh', async (req, res) => {
  const refreshToken = req.body.refresh;
  if (refreshToken === null) res.sendStatus(401);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) res.sendStatus(401);
    const accessToken = generateAccessToken({ userId: user.userId });
    res.json({ access: accessToken });
  });
});

module.exports = router;
