// const db = require("../config/db");
const app = require("../app");

const result = require("dotenv").config();

if (result.error) {
  throw result.error;
}
console.log(result.parsed);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});
