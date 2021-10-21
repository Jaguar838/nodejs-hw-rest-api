const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const {HttpCode} = require("../../config/constants");

const schemaRegistration = Joi.object({
  name: Joi.string().min(1).max(30).optional(),
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().min(8).required(),
  gender: Joi.string().valid("male", "female").optional(),
});

const schemaLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().min(8).required(),
});

const schemaSubscription = Joi.object({
  subscription: Joi.valid("starter", "pro", "business").required(),
});

const validate = async (schema, obj, res, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      message: `Field ${err.message.replace(/"/g, "")}`,
    });
  }
};

module.exports.validateRegistration = async (req, res, next) => {
  return await validate(schemaRegistration, req.body, res, next);
};

module.exports.validateLogin = async (req, res, next) => {
  return await validate(schemaLogin, req.body, res, next);
};

module.exports.validateSubscriptionUpdate = async (req, res, next) => {
  return await validate(schemaSubscription, req.params, res, next);
};
