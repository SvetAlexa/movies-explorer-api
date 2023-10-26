const router = require('express').Router();
const tokenValidation = require('../middlewares/auth');
const { NotFoundError } = require('../errors/index');

const authenticationRouter = require('./authentication');
const usersRouter = require('./users');
const moviesRouter = require('./movies');

router.use('/', authenticationRouter);

router.use('/users', tokenValidation, usersRouter);

router.use('/movies', tokenValidation, moviesRouter);

router.use('/*', tokenValidation, (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
