const { required } = require("joi");
const app = require("../app");
require("dotenv").config();

const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});
