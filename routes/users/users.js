const express = require('express');
const router = express.Router();
const guard = require('../../helpers/guard');
const loginLimit = require('../../helpers/rate-limit-login');
const wrapError = require('../../helpers/errorHandler');
const upload = require('../../helpers/uploads');

const {
  registration,
  login,
  logout,
  current,
  update,
  uploadAvatar,
  verifyUser,
  repeatEmailForVerifyUser,
} = require('../../controllers/users');

const { validateRegistration, validateLogin, validateSubscriptionUser } = require('./validation');

router.patch('/', guard, validateSubscriptionUser, wrapError(update));

router.post('/registration', validateRegistration, registration);
// Установка лимита на логин с одного IP(3р в течение часа)
router.post('/login', loginLimit, validateLogin, login);
router.post('/logout', guard, logout);
router.get('/current', guard, wrapError(current));
// Загрузка avatar
router.patch('/avatar', guard, upload.single('avatar'), uploadAvatar);
// Email
router.get('/verify/:token', wrapError(verifyUser));
router.post('/verify', repeatEmailForVerifyUser);
module.exports = router;
