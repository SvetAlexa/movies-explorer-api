const router = require('express').Router();
const tokenValidation = require('../middlewares/auth');

const authenticationRouter = require('./authentication');
const usersRouter = require('./users');
const moviesRouter = require('./movies');

router.use('/', authenticationRouter);

router.use('/users', tokenValidation, usersRouter);

router.use('/movies', tokenValidation, moviesRouter);

module.exports = router;
