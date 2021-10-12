const { express } = require("express");
const router = express.Router();
const { registration, login, logout } = require("../../controllers/users");
router.post("/registration", registration);
router.post("/login", login);
router.post("/login", logout);
module.exports = router;
