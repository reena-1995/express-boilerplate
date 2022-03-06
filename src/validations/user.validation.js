const Joi = require("joi");

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required(),
    dateOfBirth: Joi.date().required(),
  }),
};

const getUsers = {
  query: Joi.object().keys({}),
};

module.exports = {
  createUser,
  getUsers,
};
