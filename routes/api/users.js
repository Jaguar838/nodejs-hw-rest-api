const express = require("express");
const router = express.Router();

const Users = require("../../model");

const {
  validateUser,
  validateUserPatch,
  validateUserId,
} = require("./validation");

// Получаем список юзеров из json
router.get("/", async (req, res, next) => {
  try {
    const users = await Users.listUsers();
    res.status(200).json({ status: "succes", code: 200, data: { users } });
  } catch (error) {
    next(error);
  }
});

// Добавляем одного юзера в файл json
router.post("/", validateUser, async (req, res, next) => {
  try {
    const user = await Users.addUser(req.body);
    res.status(201).json({ status: "succes", code: 201, data: { user } });
  } catch (error) {
    next(error);
  }
});

// Обновляем поля юзера
router.put("/:id", validateUserId, async (req, res, next) => {
  try {
    const user = await Users.updateUser(req.params.id, req.body);
    if (user) {
      return res
        .status(200)
        .json({ status: "succes", code: 200, data: { user } });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not Found" });
  } catch (error) {
    next(error);
  }
});

// Обновляем статус пользователя
router.patch("/:id/favorite/", validateUserPatch, async (req, res, next) => {
  try {
    const user = await Users.updateUser(req.params.id, req.body);
    if (user) {
      return res
        .status(200)
        .json({ status: "succes", code: 200, data: { user } });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not Found" });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", validateUserId, async (req, res, next) => {
  try {
    const user = await Users.getUserId(req.params.id, req.body);
    if (user) {
      return res
        .status(200)
        .json({ status: "succes", code: 200, data: { user } });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not Found" });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", validateUserId, async (req, res, next) => {
  try {
    const user = await Users.removeUser(req.params.id, req.body);
    if (user) {
      return res
        .status(200)
        .json({ status: "succes", code: 200, data: { user } });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not Found" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
