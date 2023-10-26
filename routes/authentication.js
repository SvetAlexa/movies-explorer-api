const router = require('express').Router();
const tokenValidation = require('../middlewares/auth');
const { register, login, logout } = require('../сontrollers/authentication');
const { registerValidator, loginValidator } = require('../validation/validation');

router.post('/signup', registerValidator, register);
router.post('/signin', loginValidator, login);
router.post('/signout', tokenValidation, logout);

module.exports = router;
