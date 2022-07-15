const jwt = require('jsonwebtoken');

exports.generateAccessToken = (user) =>
  jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '5m',
  });

exports.authenticateToken = (req, res, next) => {
  if (req.method === 'GET') return next();

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) res.sendStatus(401);
    req.userId = user.userId;
    next();
  });
};
