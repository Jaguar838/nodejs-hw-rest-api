const User = require('../model/user');

const findById = async id => {
  return await User.findById(id);
};

const findByEmail = async email => {
  return await User.findOne({ email });
};

const create = async options => {
  const user = new User(options);
  return await user.save();
};

const findUserByVerifyToken = async verifyTokenEmail => {
  return await User.findOne({ verifyTokenEmail });
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

const updateTokenVerify = async (id, isVerified, verifyTokenEmail) => {
  return await User.updateOne({ _id: id }, { isVerified, verifyTokenEmail });
};

const updateSubscription = async (userId, body) => {
  return await User.findOneAndUpdate({ _id: userId }, { ...body }, { new: true });
};

const updateAvatar = async (id, avatar, idUserCloud = null) => {
  return await User.updateOne({ _id: id }, { avatar, idUserCloud });
};

module.exports = {
  findById,
  findByEmail,
  create,
  updateToken,
  updateSubscription,
  updateAvatar,
  updateTokenVerify,
  findUserByVerifyToken,
};
