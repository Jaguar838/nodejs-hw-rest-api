const contactsRouter = require('./routes/contacts/contacts');
const usersRouter = require('./routes/users/users');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
// protect against CSRF attacks
const helmet = require('helmet');
// Пакет для работы с query boolean - переводит String to Boolean
const boolParser = require('express-query-boolean');
const { HttpCode } = require('./config/constants');
require('dotenv').config();
const AVATAR_OF_USERS = process.env.AVATAR_OF_USERS;

const app = express();
app.use(express.static(AVATAR_OF_USERS));

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
app.use(helmet());

//remove logs in test mode
app.get('env') !== 'test' && app.use(logger(formatsLogger));
app.use(cors());

// parse application/json limit 10Kb
app.use(express.json({ limit: 10000 }));
app.use(boolParser());
// Headers Accept-Language
app.use((req, _res, next) => {
  // console.log(req.acceptsLanguages());
  app.set('lang', req.acceptsLanguages(['en', 'ru']));
  next();
});

app.use('/api/users', usersRouter);
app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND).json({ status: 'error', code: HttpCode.NOT_FOUND, message: 'Not found' });
});

app.use((err, res) => {
  console.log('🚀 ~ file: app.js ~ line 44 ~ app.use ~ err', err);
  const statusCode = err.status || HttpCode.INTERNAL_SERVER_ERROR;
  res.status(statusCode).json({
    status: statusCode === HttpCode.INTERNAL_SERVER_ERROR ? 'fail' : 'error',
    code: statusCode,
    message: err.message,
  });
});

module.exports = app;
