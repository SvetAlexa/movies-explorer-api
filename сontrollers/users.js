const mongoose = require('mongoose');
const User = require('../models/user');

const getUserInfo = (req, res) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail(() => res.status(400).send('Пользователь по указанному _id не найден'))
    .then((user) => {
      const { email, name } = user;
      res.send({ email, name });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return res.status(400).send('Переданы некорректные данные');
      }
      console.log(err.name)
      return res.status(500).send(err.message);
    });
};

const updateUserInfo = (req, res) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .orFail(() => res.status(400).send('Пользователь по указанному _id не найден'))
    .then(() => res.send({ email, name }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send('Переданы некорректные данные');
      }
      return res.status(500).send(err.message);
    });
};

module.exports = {
  getUserInfo,
  updateUserInfo,
};
