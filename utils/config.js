require('dotenv').config();

const { PORT = 3000 } = process.env;
const { DB_PATH = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const { SECRET_KEY = 'secret-dev' } = process.env;
const SALT_ROUNDS = 10;

module.exports = {
  PORT,
  DB_PATH,
  SECRET_KEY,
  SALT_ROUNDS,
};
