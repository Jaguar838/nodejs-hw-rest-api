const express = require("express");
const router = express.Router();

const Users = require("../../model");
// const patch = require("patch");
// const { validateUser, validateID, validate?} = require('./validation')

router.get("/", async (req, res, next) => {
  try {
    const users = await Users.listUsers();
    res.json({ status: "succes", code: 200, data: { users } });
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

// router.post("/", async (req, res, next) => {
//     try {
//         const user = await Users.addContact(req.body)
//         res.status(201)
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
