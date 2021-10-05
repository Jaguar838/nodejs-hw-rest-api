const { required } = require("joi");
const app = require("../app");

const result = require("dotenv").config();

if (result.error) {
  throw result.error;
}
console.log(result.parsed); //{PORT: "3000;";}

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});
