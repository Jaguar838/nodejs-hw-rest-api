const contactsRouter = require("./routes/contacts/contacts");
const usersRouter = require("./routes/users/user");

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const boolParser = require("express-query-boolean");
const { HttpCode } = require("./config/constants");
require("dotenv").config();
const AVATAR_OF_USERS = process.env.AVATAR_OF_USERS;

const app = express();
app.use(express.static(AVATAR_OF_USERS));
app.use(helmet());

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());

// parse application/json
app.use(express.json({ limit: 10000 }));
app.use(boolParser());

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((req, res) => {
  res
    .status(HttpCode.NOT_FOUND)
    .json({ status: "error", code: HttpCode.NOT_FOUND, message: "Not found" });
});

app.use((err, req, res, next) => {
  const statusCode = err.status || HttpCode.INTERNAL_SERVER_ERROR;
  res.status(statusCode).json({
    status: statusCode === HttpCode.INTERNAL_SERVER_ERROR ? "fail" : "error",
    code: statusCode,
    message: err.message,
  });
});

module.exports = app;
