const router = require('express').Router();
const { createUser, login, logout } = require('../сontrollers/user');

router.post('/signup', createUser);
router.post('/signin', login);
router.post('/signout', logout);

module.exports = router;
