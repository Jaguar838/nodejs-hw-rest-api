const { ObjectId } = require("mongodb");
const db = require("../bin/config/db");

const getCollection = async (db, name) => {
  const client = await db;
  const collection = await client.db().collection(name);
  return collection;
};

const listUsers = async () => {
  const collection = await getCollection(db, "contacts");
  const results = await collection.find({}).toArray();
  return results;
};

const addUser = async (body) => {
  const users = await db.read();
  const newUser = {
    // isFavorite: false,
    ...(body.isFavorite ? {} : { isFavorite: false }),
    // если вообще не знаешь прийдет ли это поле
    ...body,
  };
  users.push(newUser);
  await db.write(users);
  return newUser;
};

const updateUser = async (id, body) => {
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

const getUserId = async (id) => {
  const users = await db.read();
  const [user] = users.filter((user) => user.id === id);
  return user;
};

const removeUser = async (id) => {
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
  listUsers,
  addUser,
  updateUser,
  getUserId,
  removeUser,
};
