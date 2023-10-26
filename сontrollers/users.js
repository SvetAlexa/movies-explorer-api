const mongoose = require('mongoose');
const { NotFoundError, BadRequestError, ConflictError } = require('../errors/index');
const { MONGO_DUPLICATE_ERROR_CODE } = require('../utils/constants');
const User = require('../models/user');

const getUserInfo = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail(() => new NotFoundError('Пользователь по указанному _id не найден'))
    .then((user) => {
      const { email, name } = user;
      res.send({ email, name });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

const updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .orFail(() => new NotFoundError('Пользователь по указанному _id не найден'))
    .then(() => res.send({ email, name }))
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

module.exports = {
  getUserInfo,
  updateUserInfo,
};
