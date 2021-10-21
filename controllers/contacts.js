const { HttpCode } = require("../config/constants");
const Contacts = require("../repository/contacts");
const { CustomError } = require("../helpers/customError");

// Получаем список контактов
const getContacts = async (req, res) => {
  const userId = req.user._id;
  console.log(userId, req.method);
  const contacts = await Contacts.listContacts(userId, req.query);
  res.json({ status: "succes", code: 200, data: { ...contacts } });
};

const getContact = async (req, res, next) => {
  const userId = req.user._id;
  console.log(userId, req.method);
  const contact = await Contacts.getContactId(req.params.id, userId);
  if (contact) {
    return res
      .status(200)
      .json({ status: "succes", code: 200, data: { contact } });
  }
  throw new CustomError(404, "Not Found");
};

// Добавляем контакт
const addContact = async (req, res, next) => {
  const userId = req.user._id;
  console.log(userId, req.method);
  const contact = await Contacts.addContact({ ...req.body, owner: userId });
  res.status(201).json({ status: "succes", code: 201, data: { contact } });
};

// Обновляем поля контакта
const updateContact = async (req, res, next) => {
  const userId = req.user._id;
  const contact = await Contacts.updateContact(req.params.id, req.body, userId);
  console.log(userId, req.method, contact);
  if (contact) {
    return res
      .status(200)
      .json({ status: "succes", code: 200, data: { contact } });
  }
  throw new CustomError(HttpCode.NOT_FOUND, "Not Found");
};
// Удаляем контакт
const deleteContact = async (req, res, next) => {
  const userId = req.user._id;
  console.log(userId, req.method);
  const contact = await Contacts.deleteContact(req.params.id, userId);
  if (contact) {
    return res
      .status(200)
      .json({ status: "succes", code: 200, data: { contact } });
  }
  throw new CustomError(HttpCode.NOT_FOUND, "Not Found");
};

module.exports = {
  getContacts,
  getContact,
  addContact,
  updateContact,
  deleteContact,
};