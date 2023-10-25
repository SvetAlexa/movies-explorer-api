const router = require('express').Router();

const authenticationRouter = require('./authentication');

router.use('/', authenticationRouter);

module.exports = router;
