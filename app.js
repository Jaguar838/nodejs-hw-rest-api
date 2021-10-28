const contactsRouter = require("./routes/contacts/contacts");
const usersRouter = require("./routes/users/users");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
// protect against CSRF attacks
const helmet = require("helmet");
// Пакет для работы с query boolean - переводит String to Boolean
const boolParser = require("express-query-boolean");
const { HttpCode } = require("./config/constants");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(helmet());
app.use(logger(formatsLogger));
app.use(cors());

// parse application/json limit 10Kb
app.use(express.json({ limit: 10000 }));
app.use(boolParser());

app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res
    .status(HttpCode.NOT_FOUND)
    .json({ status: "error", code: HttpCode.NOT_FOUND, message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
    status: "fail",
    code: HttpCode.INTERNAL_SERVER_ERROR,
    message: err.message,
  });
});

module.exports = app;
