const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/rateLimiter');
const errorHandler = require('./middlewares/errorHandler');
const appRouter = require('./routes/index');

const { PORT, DB_PATH } = require('./utils/config');

const app = express();
app.use(cors());

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

mongoose.connect(DB_PATH, {
  useNewUrlParser: true,
})
  .then(() => console.log('connected to DB'))
  .catch(() => console.log('no connection'));

app.use(cookieParser());

app.use(requestLogger);

app.use(limiter);
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(appRouter);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
