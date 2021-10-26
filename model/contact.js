const { Schema, model } = require("mongoose");

const contactSchema = new Schema(
  {
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
    features: {
      type: Array,
      set: (data) => (!data ? [] : data),
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      name: String,
      age: Number,
      address: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id; // Удаляем _id
        // ret.name = `@${ret.name}`; // Добавляем @ к name
        return ret;
      },
    },
    toObject: { virtuals: true },
  } // отключаем версионность и add date modify, virtuals field id
);

// Добавляем необходимые поля для фронта
contactSchema.virtual("status").get(function () {
  if (this.isFavorite) {
    return "profi";
  }
  return "no profi";
});
// Если нужно добавить валидацию поля
contactSchema.path("name").validate(function (value) {
  const re = /[A-Z]\w+/;
  return re.test(String(value));
});
const Contact = model("contact", contactSchema);

module.exports = Contact;
