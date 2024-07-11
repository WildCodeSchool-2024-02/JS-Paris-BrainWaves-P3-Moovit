const joi = require("joi");

const schema = joi.object({
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "fr", "net"] } }),
  password: joi
    .string()
    .pattern(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[*.!@$%^&(){}:;<>,.?/~_+-=|]).{8,}/
    ),
  repeat_password: joi.ref("password"),
});

const nameSchema = joi.object({
  id: joi.number(),
  name: joi
    .string()
});

const training = joi.object({
  title: joi.string().required(),
  date: joi.date().required(),
  time_of_day: joi.string().required(),
  sport_id: joi.number().required(),
  duration: joi.string().required(),
  details: joi.string().allow('', null),
  user_id: joi.any(),
})

const validateSchema = (validator) => async (req, res, next) => {
  try {
    await validator.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    console.error(error.details[0].context);
    res.status(400).json(error);
  }
};

module.exports = { schema, nameSchema, training, validateSchema };
