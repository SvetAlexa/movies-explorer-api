const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const register = (req, res) => {
  const { email, name } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create(
      {
        email, name, password: hash,
      },
    ))
    .then((user) => {
      const { _id } = user;
      res.status(201).send({
        email, name, _id,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send('Переданы некорректные данные');
      }
      if (err.code === 11000) {
        return res.status(409).send('Такой пользователь уже существует');
      }
      return res.status(400).send(err.message);
    });
};

const login = (req, res) => {
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
    .catch((err) => res.status(500).send(err.message));
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
