const router = require('express').Router();
const { getUserInfo, updateUserInfo } = require('../сontrollers/users');

router.get('/me', getUserInfo);
router.patch('/me', updateUserInfo);

module.exports = router;
