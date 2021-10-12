const { Schema, model } = require("mongoose");

const contactSchema = new Schema {
  name: {
    type: String,
default: 'Guest',
  },
  email: {
      type: String,
      required: [true, 'Set email for user'],
      unique: true,
        validate(value) {
            const re = /\$+@\S+.\S+/
            return re.test(String(value).toLowerCase())
      },
  },

  password: {
    type: String,
    required: [true, 'Set password for user'],
  },
gender: {
    type: String,
          enum: {
        values: [Gender.MALE, Gender.FEMALE, Gender.NONE],
            message: 'Gender not allowed',
          },
          default: Gender none
  }
};
// const User = model