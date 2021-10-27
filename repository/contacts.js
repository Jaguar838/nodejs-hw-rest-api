const Contact = require("../model/contact");

const listContacts = async (userId) => {
  const results = await Contact.find({ owner: userId });
  return results;
};

const getContactId = async (id, userId) => {
  const result = await Contact.findOne({ _id: id, owner: userId });
  return result;
};

const addContact = async (body) => {
  const result = await Contact.create(body);
  return result;
};

const updateContact = async (id, body, userId) => {
  const result = await Contact.findOneAndUpdate(
    { _id: id, owner: userId },
    { ...body },
    { new: true }
  );
  return result;
};

const deleteContact = async (id, userId) => {
  const result = await Contact.findByIdAndRemove({ _id: id, owner: userId });
  return result;
};

module.exports = {
  listContacts,
  addContact,
  updateContact,
  getContactId,
  deleteContact,
};
