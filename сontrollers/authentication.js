const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { BadRequestError, ConflictError } = require('../errors/index');
const {
  MONGO_DUPLICATE_ERROR_CODE,
  CREATED_CODE,
  BAD_REQUEST_MESSAGE,
  CONFLICT_MESSAGE,
  OK_LOGOUT_MESSAGE,
} = require('../utils/constants');
const User = require('../models/user');

const { SECRET_KEY, DEV_SECRET_KEY, SALT_ROUNDS } = require('../utils/config');

const register = (req, res, next) => {
  const { email, name } = req.body;
  bcrypt.hash(req.body.password, SALT_ROUNDS)
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
        return next(new BadRequestError(BAD_REQUEST_MESSAGE));
      }
      if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
        return next(new ConflictError(CONFLICT_MESSAGE));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const { name, _id } = user;
      const token = jwt.sign({ _id: user._id }, process.env.NODE_ENV === 'production' ? SECRET_KEY : DEV_SECRET_KEY, { expiresIn: '7d' });
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
  res.send({ message: OK_LOGOUT_MESSAGE });
};

module.exports = {
  register,
  login,
  logout,
};
