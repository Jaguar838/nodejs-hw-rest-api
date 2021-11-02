const multer = require('multer');
require('dotenv').config();
const { CustomError } = require('./customError');
const UPLOAD_DIR = process.env.UPLOAD_DIR;

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, UPLOAD_DIR);
  },
  filename: function (req, file, callback) {
    callback(null, `${Date.now().toString()}_${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  // Ограничиваем размер загружаемого аватара 2000000 байт
  limits: { fieldSize: 2000000 },
  fileFilter: (req, file, callback) => {
    if (file.mimetype.includes('image')) {
      return callback(null, true);
    }

    // Вы можете всегда вернуть ошибку, если что-то пошло не так:
    callback(new CustomError(400, 'Wrong format for avatar'));
  },
});

module.exports = upload;
