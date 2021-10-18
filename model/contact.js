const { Schema, model } = require("mongoose");

const contactSchema = new Schema({
  name: {
    type: String,
    // unique: true,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = model("contact", contactSchema);

module.exports = Contact;
