const jwt = require('jsonwebtoken');
const Users = require('../repository/users');
const { HttpCode } = require('../config/constants');
const { CustomError } = require('../helpers/customError');
// Email
const EmailService = require('../services/email/service');
const { CreateSenderSendGrid, CreateSenderNodemailer } = require('../services/email/sender');
require('dotenv').config();
// cloud-update
// const fs = require('fs/promises');
// const UploadService = require('../services/avatars/cloud-upload');
// file upload
const path = require('path');
const mkdirp = require('mkdirp');
const UploadService = require('../services/avatars/file-upload');

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const registration = async (req, res, next) => {
  const { name, email, password, gender } = req.body;
  const user = await Users.findByEmail(email);
  if (user) {
    return res.status(HttpCode.CONFLICT).json({
      status: 'error',
      code: HttpCode.CONFLICT,
      message: 'Email is already exist',
    });
  }
  try {
    // Создаем нового пользователя и verifyToken
    // TODO: Send email for verity users
    const newUser = await Users.create({ name, email, password, gender });
    const emailService = new EmailService(process.env.NODE_ENV, new CreateSenderSendGrid());
    const statusEmail = await emailService.sendVerifyEmail(newUser.email, newUser.name, newUser.verifyTokenEmail);
    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        gender: newUser.gender,
        avatar: newUser.avatar,
        successEmail: statusEmail,
      },
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findByEmail(email);
  const isValidPassword = await user?.isValidPassword(password);
  // Возвращаем ошибку если пользователь:
  // 1) не сущ. в db;
  // 2) ввел не валидный пароль;
  // 3) состояние isVerified = false.
  if (!user || !isValidPassword || !user?.isVerified) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: 'error',
      code: HttpCode.UNAUTHORIZED,
      message: 'Invalid credentials',
    });
  }
  const id = user._id;
  const payload = { id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
  await Users.updateToken(id, token);
  return res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    data: {
      token,
    },
  });
};

const logout = async (req, res) => {
  const id = req.user._id;
  await Users.updateToken(id, null);
  return res.status(HttpCode.NO_CONTENT).json({ test: 'test' });
};

const current = async (req, res) => {
  const userId = req.user._id;
  const user = await Users.findById(userId);
  if (user) {
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      message: 'Current user',
      data: {
        // user,
        id: user.id,
        email: user.email,
        subscription: user.subscription,
        avatar: user.avatar,
      },
    });
  }
  throw new CustomError(HttpCode.NOT_FOUND, 'Not Found');
};

const update = async (req, res) => {
  const userId = req.user._id;
  const user = await Users.updateSubscription(userId, req.body);
  if (user) {
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  }
  throw new CustomError(HttpCode.NOT_FOUND, 'Not Found');
};

// Local storage
const uploadAvatar = async (req, res, next) => {
  const id = String(req.user._id);
  const file = req.file;
  const AVATAR_OF_USERS = process.env.AVATAR_OF_USERS;
  const destination = path.join(AVATAR_OF_USERS, id);
  await mkdirp(destination);
  const uploadService = new UploadService(destination);
  const avatarUrl = await uploadService.save(file, id);
  await Users.updateAvatar(id, avatarUrl);
  return res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      avatar: avatarUrl,
    },
  });
  // const pic = req.file;
  // console.log(pic);
  // return res.status(HttpCode.OK).json({ pic });
};

// Cloud storage
// const uploadAvatar = async (req, res, next) => {
//   const { id, idUserCloud } = req.user;
//   const file = req.file;

//   const destination = 'Avatars';
//   const uploadService = new UploadService(destination);
//   const { avatarUrl, returnIdUserCloud } = await uploadService.save(file.path, idUserCloud);

//   await Users.updateAvatar(id, avatarUrl, returnIdUserCloud);
//   try {
//     // удаляем загруженный в папку uploads файл
//     await fs.unlink(file.path);
//   } catch (error) {
//     console.log(error.message);
//   }
//   return res.status(HttpCode.OK).json({
//     status: 'success',
//     code: 200,
//     data: {
//       avatar: avatarUrl,
//     },
//   });
// };

// Controllers verify User
const verifyUser = async (req, res, next) => {
  const user = await Users.findUserByVerifyToken(req.params.token);
  if (user) {
    await Users.updateTokenVerify(user._id, true, null);
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        message: 'Verification successful!',
      },
    });
  }
  return res.status(HttpCode.BAD_REQUEST).json({
    status: 'error',
    code: HttpCode.BAD_REQUEST,
    message: 'Invalid token',
  });
};

// Controllers repeat email  for verify User
const repeatEmailForVerifyUser = async (req, res, next) => {
  const { email } = req.body;
  const user = await Users.findByEmail(email);
  if (user) {
    const { email, name, verifyTokenEmail } = user;
    const emailService = new EmailService(process.env.NODE_ENV, new CreateSenderNodemailer());
    // debugger;
    const statusEmail = await emailService.sendVerifyEmail(email, name, verifyTokenEmail);
  }
  return res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    data: {
      message: 'Verify successful!',
    },
  });
};
module.exports = {
  registration,
  login,
  logout,
  current,
  update,
  uploadAvatar,
  verifyUser,
  repeatEmailForVerifyUser,
};
