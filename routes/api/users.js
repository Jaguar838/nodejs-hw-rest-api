const express = require("express");
const router = express.Router();

const Users = require("../../model");

// const { validateUser, validateID, validate?} = require('./validation')

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
router.post("/", async (req, res, next) => {
  try {
    const user = await Users.addUser(req.body);
    res.status(201).json({ status: "succes", code: 200, data: { user } });
  } catch (error) {
    next(error);
  }
});

// router.get("/:id", async (req, res, next) => {
//     try {
//         const user = await Users.getUserId(req.param.id)
//         if (user) {

//         }
//     } catch (error) {

//     }
// });

// router.delete('/:id', async (req, res, next) => {
//     res.json({'template message'})
// })

// router.patch('/:id/vaccinated', async (req, res, next) => {
//     try {

//     }
// })

module.exports = router;
