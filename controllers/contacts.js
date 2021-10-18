const express = require("express");
const router = express.Router();

const Users = require("../repository");

// Получаем список юзеров из json
router.get("/", async (req, res, next) => {
  try {
    console.log(req.method);
    const users = await Users.listUsers();
    res.status(200).json({ status: "succes", code: 200, data: { users } });
  } catch (error) {
    next(error);
  }
});

// Добавляем одного юзера в файл json
router.post("/", async (req, res, next) => {
  try {
    console.log(req.method);
    const user = await Users.addUser(req.body);
    res.status(201).json({ status: "succes", code: 201, data: { user } });
  } catch (error) {
    next(error);
  }
});

// Обновляем поля юзера
router.put("/:id", async (req, res, next) => {
  try {
    console.log(req.method);
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
router.patch("/:id/favorite/", async (req, res, next) => {
  try {
    console.log(req.method);
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

router.get("/:id", async (req, res, next) => {
  try {
    console.log(req.method);
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

router.delete("/:id", async (req, res, next) => {
  try {
    console.log(req.method);
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
