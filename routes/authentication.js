const router = require('express').Router();
const tokenValidation = require('../middlewares/auth');
const { register, login, logout } = require('../сontrollers/authentication');

router.post('/signup', register);
router.post('/signin', login);
router.post('/signout', tokenValidation, logout);

module.exports = router;
