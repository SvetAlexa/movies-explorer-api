const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const appRouter = require('./routes/index');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
  useNewUrlParser: true,
})
  .then(() => console.log('connected to DB'))
  .catch(() => console.log('no connection'));

const app = express();

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(appRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
