const crypto = require("crypto");
const DB = require("./db");
const db = new DB("contacts.json");

const listContacts = async () => {
  return await db.read();
};

const addContact = async (body) => {
  const users = await db.read();
  const newContact = {
    id: crypto.randomUUID(),
    // isFavorite: false,
    ...(body.isFavorite ? {} : { isFavorite: false }),
    // если вообще не знаешь прийдет ли это поле
    ...body,
  };
  users.push(newContact);
  await db.write(users);
  return newContact;
};

const updateContact = async (id, body) => {
  const users = await db.read();
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    const user = users[index];
    users[index] = { ...user, ...body };
    return users[index];
  }
  return null; // ничего нет
  // undefined - нельзя делать, это не от нас зависит(запрос не пришел или чего-то не отправили).
};

const getContactId = async (id) => {
  const users = await db.read();
  const [user] = users.filter((user) => user.id === id);
  return user;
};

const removeContact = async (id) => {
  const users = await db.read();
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    const [result] = users.splice(index, 1);
    await db.write(users);
    return result;
  }
  return null;
};

module.exports = {
  listContacts,
  addContact,
  updateContact,
  getContactId,
  removeContact,
};
