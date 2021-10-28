const express = require("express");
const router = express.Router();
const guard = require("../../helpers/guard");
const loginLimit = require("../../helpers/rate-limit-login");

const {
  registration,
  login,
  logout,
  current,
  update,
} = require("../../controllers/users");

const {
  validateRegistration,
  validateLogin,
  validateSubscriptionUser,
} = require("./validation");


router.post("/registration", validateRegistration, registration);
// Установка лимита на логин с одного IP(3р в течение часа)
router.post("/login", loginLimit, validateLogin, login);
router.post("/logout", guard, logout);
router.get("/current", guard, current);
router.patch("/:id/subscription/", guard, validateSubscriptionUser, update);
module.exports = router;
