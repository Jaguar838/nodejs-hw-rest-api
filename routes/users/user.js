const express = require("express");
const router = express.Router();
const guard = require("../../helpers/guard");
const loginLimit = require("../../helpers/rate-limit-login");
const upload = require("../../helpers/uploads");
const {
  registration,
  login,
  logout,
  current,
  update,
  uploadAvatar,
  verifyUser,
  repeatEmailForVerifyUser,
} = require("../../controllers/users");

const {
  validateRegistration,
  validateLogin,
  validateSubscriptionUpdate,
} = require("./validation");

router.post("/registration", validateRegistration, registration);
router.post("/login", loginLimit, validateLogin, login);
router.post("/logout", guard, logout);
router.get("/current", guard, current);
router.patch("/", guard, validateSubscriptionUpdate, update);
router.post("/avatar", guard, upload.single("avatar"), uploadAvatar);
router.get("/verify/:token", verifyUser);
router.get("/verify", repeatEmailForVerifyUser);

module.exports = router;
