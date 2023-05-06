const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const AuthError = require('../errors/auth-err');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError('Authorization required');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (next) {
    throw new AuthError('Authorization required');
  }

  req.user = payload;
  return next();
}