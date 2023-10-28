const mongoose = require('mongoose');
const { NotFoundError, BadRequestError, ConflictError } = require('../errors/index');
const {
  MONGO_DUPLICATE_ERROR_CODE, NOT_FOUND_USER_MESSAGE, CONFLICT_MESSAGE, BAD_REQUEST_MESSAGE,
} = require('../utils/constants');
const User = require('../models/user');

const getUserInfo = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail(() => new NotFoundError(NOT_FOUND_USER_MESSAGE))
    .then((user) => {
      const { email, name } = user;
      res.send({ email, name });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestError(BAD_REQUEST_MESSAGE));
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
    .orFail(() => new NotFoundError(NOT_FOUND_USER_MESSAGE))
    .then(() => res.send({ email, name }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(BAD_REQUEST_MESSAGE));
      }
      if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
        return next(new ConflictError(CONFLICT_MESSAGE));
      }
      return next(err);
    });
};

module.exports = {
  getUserInfo,
  updateUserInfo,
};
