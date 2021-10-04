const crypto = require("crypto");
const DB = require("./db");
const db = new DB("users.json");

const listUsers = async () => {
  return await db.read();
};

const addUser = async (body) => {
  const users = await db.read();
  const newUser = {
    id: crypto.randomUUID(),
    // isFavorite: false,
    ...(body.isFavorite ? {} : { isFavorite: false }),
    // если вообще не знаешь прийдет ли это поле
    ...body,
  };
  users.push(newUser);
  await db.write(users);
  return newUser;
};

// const getUserId = async (UserId) => {
// const users = await db.read();
//   const [user] = users.filter((user) => user.id === id);
//   return user
// };

// const removeUser = async (UserId) => {
//  const users = await db.read();
//   const index = users.findIndex((user) => user.id === id);
//   if (index !== -1) {

//   }};

// const updateUser = async (UserId, body) => {
//   const users = await db.read();
//   const index = users.findIndex((user) => user.id === id);
//   if (index !== -1) {
//     const user = users[index]
//     users[index] = { ...user, ...}
//     return null
//   }
//   return
// };

module.exports = {
  listUsers,
  addUser,
  // getUserId,
  // removeUser,
  // updateUser,
};
