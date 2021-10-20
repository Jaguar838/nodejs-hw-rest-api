const express = require("express");
const router = express.Router();

const Contacts = require("../../model");

const {
  validateContact,
  validateContactPatch,
  validateContactId,
} = require("./validation");

// Получаем список контактов из json
router.get("/", async (req, res, next) => {
  try {
    console.log(req.method);
    const contacts = await Contacts.listContacts();
    res.status(200).json({ status: "succes", code: 200, data: { contacts } });
  } catch (error) {
    next(error);
  }
});

// Добавляем один контакт в файл json
router.post("/", validateContact, async (req, res, next) => {
  try {
    console.log(req.method);
    const contact = await Contacts.addContact(req.body);
    res.status(201).json({ status: "succes", code: 201, data: { contact } });
  } catch (error) {
    next(error);
  }
});

// Обновляем поля контакта
router.put("/:id", validateContactId, async (req, res, next) => {
  try {
    console.log(req.method);
    const contact = await Contacts.updateContact(req.params.id, req.body);
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
});

// Обновляем статус контакта
router.patch("/:id/favorite/", validateContactPatch, async (req, res, next) => {
  try {
    console.log(req.method);
    const contact = await Contacts.updateContact(req.params.id, req.body);
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
});

router.get("/:id", validateContactId, async (req, res, next) => {
  try {
    console.log(req.method, validateContactId);
    const contact = await Contacts.getContactId(req.params.id, req.body);
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
});

router.delete("/:id", validateContactId, async (req, res, next) => {
  try {
    console.log(req.method);
    const contact = await Contacts.removeContact(req.params.id, req.body);
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
});

module.exports = router;
