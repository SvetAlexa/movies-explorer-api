const router = require('express').Router();
const tokenValidation = require('../middlewares/auth');
const { NotFoundError } = require('../errors/index');
const { NOT_FOUND_PAGE_MESSAGE } = require('../utils/constants');

const authenticationRouter = require('./authentication');
const usersRouter = require('./users');
const moviesRouter = require('./movies');

router.use('/', authenticationRouter);

router.use('/users', tokenValidation, usersRouter);

router.use('/movies', tokenValidation, moviesRouter);

router.use('/*', tokenValidation, (req, res, next) => {
  next(new NotFoundError(NOT_FOUND_PAGE_MESSAGE));
});

module.exports = router;
