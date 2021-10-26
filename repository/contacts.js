const Contact = require("../model/contact");

const listContacts = async () => {
  const results = await Contact.find({});
  return results;
};

const getContactId = async (id) => {
  const result = await Contact.findById(id);
  return result;
};

const updateContact = async (id, body) => {
  const { value: result } = await Contact.findOneAndUpdate(
    { _id: id },
    { ...body },
    { new: true }
  );
  return result;
};

const addContact = async (body) => {
  const result = await Contact.create(body);
  return result;
};

const deleteContact = async (id) => {
  const result = await Contact.findByIdAndRemove({ _id: id });
  return result;
};

module.exports = {
  listContacts,
  addContact,
  updateContact,
  getContactId,
  deleteContact,
};
