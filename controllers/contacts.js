const Contacts = require("../repository/contacts");

// Получаем список контактов из db
// router.get("/",
const getContacts = async (req, res, next) => {
  try {
    console.log(req.method);
    const contacts = await Contacts.listContacts();
    res.status(200).json({ status: "succes", code: 200, data: { contacts } });
  } catch (error) {
    next(error);
  }
};

// Получаем один контакт из db по id
// router.get("/:id",
const getContact = async (req, res, next) => {
  try {
    // console.log(req.method);
    const contact = await Contacts.getContactId(req.params.id, req.body);
    // console.log(contact, contact.id);
    if (contact) {
      return res
        .status(200)
        .json({ status: "succes", code: 200, data: { contact } });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not Found" });
  } catch (error) {
    next(error);
  }
};

// Добавляем контакт в db
// router.post("/",
const addContact = async (req, res, next) => {
  try {
    console.log(req.method);
    const contact = await Contacts.addContact(req.body);
    if (!contact.name || !contact.email || !contact.phone) {
      return res
        .status(400)
        .json({ status: "error", code: 400, data: { contact } });
    }
    res.status(201).json({ status: "succes", code: 201, data: { contact } });
  } catch (error) {
    next(error);
  }
};

// Обновляем поля контакта по id
// router.put("/:id",
const updateContact = async (req, res, next) => {
  try {
    console.log(req.method);
    const contact = await Contacts.updateContact(req.params.id, req.body);
    console.log(contact);
    if (contact) {
      return res
        .status(200)
        .json({ status: "succes", code: 200, data: { contact } });
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
//     const contact = await Contacts.updateContact(req.params.id, req.body);
//     if (contact) {
//       return res
//         .status(200)
//         .json({ status: "succes", code: 200, data: { contact } });
//     }
//     return res
//       .status(404)
//       .json({ status: "error", code: 404, message: "Not Found" });
//   } catch (error) {
//     next(error);
//   }
// });

// router.delete("/:id",
const deleteContact = async (req, res, next) => {
  try {
    console.log(req.method);
    const contact = await Contacts.deleteContact(req.params.id);
    if (contact) {
      return res
        .status(200)
        .json({ status: "success", code: 200, message: "contact deleted" });
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
