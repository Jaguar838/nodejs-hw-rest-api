const Contact = require("../model/contact");

const listContacts = async (userId, query) => {
  // Связывание полей с users колекцией
  // const results = await Contact.find({ owner: userId }).populate({
  //   path: "owner",
  //   select: "name email gender createdAt updatedAt -_id",
  // });
  // Pagination
  const {
    sortBy,
    sortByDesc,
    filter,
    isFavorite = null,
    limit = 5,
    page = 1,
    // Смещение от начала массива
    // offset = 0,
  } = query;
  const searchOptions = { owner: userId };
  if (isFavorite !== null) {
    // стал boolean, до установки пакета был строкой
    // console.log(typeof isFavorite);
    searchOptions.isFavorite = isFavorite;
  }
  const results = await Contact.paginate(searchOptions, {
    limit,
    page,
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
      ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
    },
    select: filter ? filter.split("|").join(" ") : "", // вместо | подставить пробел
    populate: {
      path: "owner",
      select: "name email gender createdAt updatedAt",
    },
  });
  const { docs: contacts } = results;
  delete results.docs;
  return { ...results, contacts };
};

const getContactId = async (id, userId) => {
  const result = await Contact.findOne({ _id: id, owner: userId }).populate({
    path: "owner",
    // выборка/исключение полей owner(чтобы полностью убрать id нужно откл. виртуальные поля в модели)
    select: "name email gender createdAt updatedAt -_id",
  });
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
