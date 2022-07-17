const jwt = require('jsonwebtoken');
const { ACCESS, REFRESH } = require('./tokenTypes');

exports.generateToken = (userId, type) => {
  if (!userId && !type) return;

  let secret;
  let expiresIn;

  if (type === ACCESS) {
    secret = process.env.ACCESS_TOKEN_SECRET;
    expiresIn = '5m';
  } else if (type === REFRESH) {
    secret = process.env.REFRESH_TOKEN_SECRET;
    expiresIn = '1d';
  }

  return jwt.sign({ userId }, secret, { expiresIn });
};

exports.authenticateToken = (req, res, next) => {
  if (req.method === 'GET') return next();

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(401);
    req.userId = user.userId;
    next();
  });
};
