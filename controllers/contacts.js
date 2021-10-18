const express = require("express");
const router = express.Router();
const { HttpCode } = require("../config/constants");
const Contacts = require("../repository/contacts");

const {
  validateContact,
  validateContactPatch,
  validateContactId,
} = require("../routes/contacts/validation");

// Получаем список контактов
router.get("/", async (req, res, next) => {
  try {
    console.log(req.method);
    const contacts = await Contacts.listContacts();
    res
      .status(HttpCode.OK)
      .json({ status: "succes", code: HttpCode.OK, data: { contacts } });
  } catch (error) {
    next(error);
  }
});

// Добавляем контакт
router.post("/", validateContact, async (req, res, next) => {
  try {
    console.log(req.method);
    const contact = await Contacts.addContact(req.body);
    res
      .status(HttpCode.CREATED)
      .json({ status: "succes", code: HttpCode.CREATED, data: { contact } });
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
        .status(HttpCode.OK)
        .json({ status: "succes", code: HttpCode.OK, data: { contact } });
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

// Обновляем статус контакта
router.patch("/:id/favorite/", validateContactPatch, async (req, res, next) => {
  try {
    console.log(req.method);
    const contact = await Contacts.updateContact(req.params.id, req.body);
    if (contact) {
      return res
        .status(HttpCode.OK)
        .json({ status: "succes", code: HttpCode.OK, data: { contact } });
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

router.get("/:id", validateContactId, async (req, res, next) => {
  try {
    console.log(req.method);
    const contact = await Contacts.getContactId(req.params.id, req.body);
    if (contact) {
      return res
        .status(HttpCode.OK)
        .json({ status: "succes", code: HttpCode.OK, data: { contact } });
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

router.delete("/:id", validateContactId, async (req, res, next) => {
  try {
    console.log(req.method);
    const contact = await Contacts.removeContact(req.params.id, req.body);
    if (contact) {
      return res
        .status(HttpCode.OK)
        .json({ status: "succes", code: HttpCode.OK, data: { contact } });
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
