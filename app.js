const contactsRouter = require("./routes/contacts/contacts");
// const usersRouter = require("./routes/users/user");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const app = express();
app.use(helmet());

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
// Operation logs
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
// app.use("/api/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ status: "error", code: 404, message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ status: "fail", code: 500, message: err.message });
});

module.exports = app;
