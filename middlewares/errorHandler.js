const { INTERNAL_SERVER_CODE } = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  const { statusCode = INTERNAL_SERVER_CODE, message } = err;

  res.status(statusCode).send({ message: statusCode === INTERNAL_SERVER_CODE ? 'На сервере произошла ошибка' : message });

  next();
};

module.exports = errorHandler;
