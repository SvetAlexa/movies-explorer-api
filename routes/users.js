const router = require('express').Router();
const { getUserInfo, updateUserInfo } = require('../сontrollers/users');
const { updateUserInfoValidator } = require('../validation/validation');

router.get('/me', getUserInfo);
router.patch('/me', updateUserInfoValidator, updateUserInfo);

module.exports = router;
