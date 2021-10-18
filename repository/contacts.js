const { ObjectId } = require("mongodb");
const db = require("../bin/config/db");

const getCollection = async (db, name) => {
  const client = await db;
  const collection = await client.db().collection(name);
  return collection;
};

const listContacts = async () => {
  const collection = await getCollection(db, "contacts");
  const results = await collection.find({}).toArray();
  return results;
};

const updateContact = async (id, body) => {
  const collection = await getCollection(db, "contacts");
  const oid = new ObjectId(id);
  const { value: result } = await collection.findOneAndUpdate(
    { _id: oid },
    { $set: body },
    { returnDocument: "after" }
  );
  return result;
};

const getContactId = async (id) => {
  const collection = await getCollection(db, "contacts");
  const oid = new ObjectId(id);
  const [result] = await collection.find({ _id: oid }).toArray();
  return result;
};

const addContact = async (body) => {
  const newContact = {
    // isFavorite: false,
    ...(body.isFavorite ? {} : { isFavorite: false }),
    // если вообще не знаешь прийдет ли это поле
    ...body,
  };
  const collection = await getCollection(db, "contacts");
  const result = await collection.insertOne(newContact);
  return await getContactId(result.insertedId);
};

const deleteContact = async (id) => {
  const collection = await getCollection(db, "contacts");
  const oid = new ObjectId(id);
  const { value: results } = await collection.findOneAndDelete({ _id: oid });
  return results;
};

module.exports = {
  listContacts,
  addContact,
  updateContact,
  getContactId,
  deleteContact,
};
