const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { BadRequestError, ConflictError } = require('../errors/index');
const { MONGO_DUPLICATE_ERROR_CODE, CREATED_CODE } = require('../utils/constants');
const User = require('../models/user');

const register = (req, res, next) => {
  const { email, name } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create(
      {
        email, name, password: hash,
      },
    ))
    .then((user) => {
      const { _id } = user;
      res.status(CREATED_CODE).send({
        email, name, _id,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
        return next(new ConflictError('Пользователь с таким email уже существует'));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const { name, _id } = user;
      const token = jwt.sign({ _id: user._id }, 'secret-key', { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        })
        .send({ email, name, _id });
    })
    .catch(next);
};

const logout = (req, res) => {
  res.clearCookie('jwt', { path: '/' });
  res.send('Вы успешно вышли из аккаунта');
};

module.exports = {
  register,
  login,
  logout,
};
