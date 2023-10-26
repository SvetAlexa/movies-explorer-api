const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100,
  message: { message: 'Превышен лимит запросов. Попробуйте еще раз позже.' },
});

module.exports = limiter;
