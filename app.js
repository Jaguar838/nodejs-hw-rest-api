import express, { json } from "express";
import logger from "morgan";
import cors from "cors";
const helmet = require("helmet");

import contactsRouter from "./routes/contacts/contacts";
import usersRouter from "./routes/users/user";

const app = express();
app.use(helmet());

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(json());

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ status: "error", code: 404, message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ status: "fail", code: 500, message: err.message });
});

export default app;
