const Joi = require("joi");
const schemaUser = Joi.object({
  name: Joi.string().alphanum().min(1).max(20).required,
});
const validate = async (schema, obj, res, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (err) {
    console.error(err);
    res.status(400).json({ status: "error", code: 400, message: `Field: ${message.replace(/"/g, '')}` });
  }
};
const pattern = '\\w{8}-\\w{4}-\\w{4}-\\w{12}'
const schema

module.exports.validate