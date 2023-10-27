const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/index');
const { UNAUTHORIZED_MESSAGE } = require('../utils/constants');

const { SECRET_KEY, DEV_SECRET_KEY } = require('../utils/config');

const tokenValidation = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new UnauthorizedError(UNAUTHORIZED_MESSAGE));
  }

  let payload;

  try {
    payload = jwt.verify(token, process.env.NODE_ENV === 'production' ? SECRET_KEY : DEV_SECRET_KEY);
  } catch (err) {
    return next(new UnauthorizedError(UNAUTHORIZED_MESSAGE));
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  return next();
};

module.exports = tokenValidation;
