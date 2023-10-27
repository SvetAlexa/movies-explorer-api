const rateLimit = require('express-rate-limit');
const { TOO_MANY_REQUESTS_MESSAGE } = require('../utils/constants');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100,
  message: { message: TOO_MANY_REQUESTS_MESSAGE },
});

module.exports = limiter;
