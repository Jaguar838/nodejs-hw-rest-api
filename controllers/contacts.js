const express = require("express");
const router = express.Router();
const { HttpCode } = require("../config/constants");
const Users = require("../repository");

const {
  validateUser,
  validateUserPatch,
  validateUserId,
} = require("../routes/contacts/validation");

// Получаем список юзеров из json
router.get("/", async (req, res, next) => {
  try {
    console.log(req.method);
    const users = await Users.listUsers();
    res
      .status(200)
      .json({ status: "succes", code: HttpCode.OK, data: { users } });
  } catch (error) {
    next(error);
  }
});

// Добавляем одного юзера в файл json
router.post("/", validateUser, async (req, res, next) => {
  try {
    console.log(req.method);
    const user = await Users.addUser(req.body);
    res
      .status(201)
      .json({ status: "succes", code: HttpCode.CREATED, data: { user } });
  } catch (error) {
    next(error);
  }
});

// Обновляем поля юзера
router.put("/:id", validateUserId, async (req, res, next) => {
  try {
    console.log(req.method);
    const user = await Users.updateUser(req.params.id, req.body);
    if (user) {
      return res
        .status(200)
        .json({ status: "succes", code: HttpCode.OK, data: { user } });
    }
    return res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: "Not Found",
    });
  } catch (error) {
    next(error);
  }
});

// Обновляем статус пользователя
router.patch("/:id/favorite/", validateUserPatch, async (req, res, next) => {
  try {
    console.log(req.method);
    const user = await Users.updateUser(req.params.id, req.body);
    if (user) {
      return res
        .status(200)
        .json({ status: "succes", code: HttpCode.OK, data: { user } });
    }
    return res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: "Not Found",
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", validateUserId, async (req, res, next) => {
  try {
    console.log(req.method);
    const user = await Users.getUserId(req.params.id, req.body);
    if (user) {
      return res
        .status(200)
        .json({ status: "succes", code: HttpCode.OK, data: { user } });
    }
    return res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: "Not Found",
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", validateUserId, async (req, res, next) => {
  try {
    console.log(req.method);
    const user = await Users.removeUser(req.params.id, req.body);
    if (user) {
      return res
        .status(200)
        .json({ status: "succes", code: HttpCode.OK, data: { user } });
    }
    return res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: "Not Found",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
