const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const patterns = {
  name: /[a-zA-Zа-яА-Я]*$/,
  phone: /^(?:\+\s?\d+\s?)?(?:\(\d{1,4}\))?(?:[-\s./]?\d){5,}$/,
  id: /^\d+$|^\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/,
};

const schemaUser = Joi.object({
  name: Joi.string().pattern(patterns.name).min(1).max(20).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(patterns.phone).required(),
  isFavorite: Joi.boolean().optional(),
});

const schemaUserPatch = Joi.object({
  isFavorite: Joi.boolean().required(),
});

const schemaUserId = {
  id: Joi.objectId().required(),
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

module.exports.validateUser = async (req, res, next) => {
  return await validate(schemaUser, req.body, res, next);
};

module.exports.validateUserPatch = async (req, res, next) => {
  return await validate(schemaUserPatch, req.body, res, next);
};

module.exports.validateUserId = async (req, res, next) => {
  return await validate(schemaUserId, req.params, res, next);
};