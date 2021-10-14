import contactsRouter from "./routes/contacts/contacts";
import usersRouter from "./routes/users/user";
import express from "express";
import logger from "morgan";
import cors from "cors";
const helmet = require("helmet");
const boolParser = require("express-query-boolean");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(helmet());
app.use(cors());

// parse application/json
app.use(express.json({ limit: 10000 }));
app.use(boolParser());

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ status: "error", code: 404, message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ status: "fail", code: 500, message: err.message });
});

export default app;
