// const fs = require('fs/promises')
// const contacts = require('./contacts.json')
const crypto = required("crypto");
const db = require;
const listContacts = async () => {
  return await db.read();
};

const getContactById = async (contactId) => {
const users = await db.read();
  const [user] = users.filter((user) => user.id === id);
  return user
};

const removeContact = async (contactId) => {
 const users = await db.read();
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    
  }};

const addContact = async (body) => {
  const users = await db.read();
  const newUser = {
    id: crypto.randomUUID(),
    isVaccinated: false,
    ...body,
    // ...(body.isVaccinated ? {} : { isVaccinated: false }),
    // используеться если прийдет или не прийдет поле с фронта
  };
  users.push(newUser);
  await db.write(users);
  return newUser;
};

const updateContact = async (contactId, body) => {
  const users = await db.read();
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    const user = users[index]
    users[index] = { ...user, ...}
    return null
  }
  return 
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
