const { Shema, model } = require("mongoose");
const contactSchema = {
  name: {
    type: String,
    // unique: true,
    required: [true, "Set name for User"],
  },
  email: {
    type: String,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
};
// const
