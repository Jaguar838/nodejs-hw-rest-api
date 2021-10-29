const jwt = require("jsonwebtoken");
const Users = require("../repository/users");
const { HttpCode } = require("../config/constants");
const { CustomError } = require("../helpers/customError");
require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const registration = async (req, res, next) => {
  const { name, email, password, gender } = req.body;
  const user = await Users.findByEmail(email);
  if (user) {
    return res.status(HttpCode.CONFLICT).json({
      status: "error",
      code: HttpCode.CONFLICT,
      message: "Email is already exist",
    });
  }
  try {
    const newUser = await Users.create({ name, email, password, gender });
    return res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        gender: newUser.gender,
      },
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findByEmail(email);
  const isValidPassword = await user?.isValidPassword(password);
  if (!user || !isValidPassword) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: "error",
      code: HttpCode.UNAUTHORIZED,
      message: "Invalid credentials",
    });
  }
  const id = user._id;
  const payload = { id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await Users.updateToken(id, token);
  return res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    date: {
      token,
    },
  });
};

const logout = async (req, res) => {
  const id = req.user._id;
  await Users.updateToken(id, null);
  return res.status(HttpCode.NO_CONTENT).json({ test: "test" });
};

const current = async (req, res) => {
  const userId = req.user._id;
  const user = await Users.findById(userId);
  if (user) {
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      message: "Current user",
      data: {
        id: user.id,
        email: user.email,
        subscription: user.subscription
      }
    });
  }
  throw new CustomError(HttpCode.NOT_FOUND, "Not Found");
};

const update = async (req, res) => {
  const userId = req.user._id;
  const user = await Users.updateSubscription(userId, req.body);
  if (user) {
  return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  };
throw new CustomError(HttpCode.NOT_FOUND, "Not Found");
};

module.exports = {
  registration,
  login,
  logout,
  current,
  update,
};
