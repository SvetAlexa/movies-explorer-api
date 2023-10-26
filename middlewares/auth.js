const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/index');

const tokenValidation = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new UnauthorizedError('Необходимо авторизоваться'));
  }

  let payload;

  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    return next(new UnauthorizedError('Необходимо авторизоваться'));
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  return next();
};

module.exports = tokenValidation;
