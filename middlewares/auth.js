const jwt = require('jsonwebtoken');

const tokenValidation = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).send('Необходимо авторизоваться');
  }

  let payload;

  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    return res.status(401).send('Необходимо авторизоваться');
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  return next();
};

module.exports = tokenValidation;
