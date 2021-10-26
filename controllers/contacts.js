const Contacts = require("../repository/contacts");

// Получаем список контактов из db
// router.get("/",
const getContacts = async (req, res, next) => {
  try {
    console.log(req.method);
    const users = await Contacts.listContacts();
    res.status(200).json({ status: "succes", code: 200, data: { users } });
  } catch (error) {
    next(error);
  }
};

// Добавляем контакт в db
// router.post("/",
const addContact = async (req, res, next) => {
  try {
    console.log(req.method);
    const user = await Contacts.addContact(req.body);
    res.status(201).json({ status: "succes", code: 201, data: { user } });
  } catch (error) {
    next(error);
  }
};

// Обновляем поля контакта по id
// router.put("/:id",
const updateContact = async (req, res, next) => {
  try {
    console.log(req.method);
    const user = await Contacts.updateContact(req.params.id, req.body);
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
};

// Обновляем статус контакта
// router.patch("/:id/favorite/", async (req, res, next) => {
//   try {
//     console.log(req.method);
//     const user = await Contacts.updateContact(req.params.id, req.body);
//     if (user) {
//       return res
//         .status(200)
//         .json({ status: "succes", code: 200, data: { user } });
//     }
//     return res
//       .status(404)
//       .json({ status: "error", code: 404, message: "Not Found" });
//   } catch (error) {
//     next(error);
//   }
// });

// router.get("/:id",
const getContact = async (req, res, next) => {
  try {
    console.log(req.method);
    const user = await Contacts.getContactId(req.params.id, req.body);
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
};

// router.delete("/:id",
const deleteContact = async (req, res, next) => {
  try {
    console.log(req.method);
    const user = await Contacts.deleteContact(req.params.id, req.body);
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
};

module.exports = {
  getContacts,
  getContact,
  addContact,
  updateContact,
  deleteContact,
};
