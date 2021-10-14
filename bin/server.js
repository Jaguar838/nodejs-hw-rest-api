import { then } from "./db.js";
import { listen } from "../app";

const result = require("dotenv").config();

if (result.error) {
  throw result.error;
}
console.log(result.parsed);

const PORT = process.env.PORT;

then(() => {
  listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch((err) => {
  console.log(`Server not run. Error: ${err.message}`);
});
