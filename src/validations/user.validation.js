const Joi = require("joi");

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required(),
    dateOfBirth: Joi.date().required(),
    password: Joi.string().required().min(6),
    role: Joi.string().valid("user", "admin").default("user"),
  }),
};

const getUsers = {
  query: Joi.object().keys({}),
};

const userLogin = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

const refreshToken = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const logout = { 
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
}

module.exports = {
  createUser,
  getUsers,
  userLogin,
  refreshToken,
  logout
};
