const { Schema, model } = require("mongoose");

const contactSchema = new Schema {
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
