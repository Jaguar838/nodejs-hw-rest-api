const Joi = require("joi");

const patterns = {
  name: /[a-zA-Zа-яА-Я]*$/,
  phone: /^(?:\+\s?\d+\s?)?(?:\(\d{1,4}\))?(?:[-\s./]?\d){5,}$/,
  id: /^\d+$|^\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/,
};

const schemaContact = Joi.object({
  name: Joi.string().pattern(patterns.name).min(1).max(20).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(patterns.phone).required(),
  isFavorite: Joi.boolean().optional(),
});

const schemaContactPatch = Joi.object({
  isFavorite: Joi.boolean().required(),
});

const schemaContactId = {
  id: Joi.string().pattern(patterns.id).required(),
};

const validate = async (schema, obj, res, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (err) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: `Field ${err.message.replace(/"/g, "")}`,
    });
  }
};

module.exports.validateContact = async (req, res, next) => {
  return await validate(schemaContact, req.body, res, next);
};

module.exports.validateContactPatch = async (req, res, next) => {
  return await validate(schemaContactPatch, req.body, res, next);
};

module.exports.validateContactId = async (req, res, next) => {
  return await validate(schemaContactId, req.params, res, next);
};
