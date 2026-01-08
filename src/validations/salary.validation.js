const Joi = require("joi");

const createSalary = {
  body: Joi.object().keys({
    user: Joi.object().required(),
    salary: Joi.number().required(),
    creditDate: Joi.date().required(),
  }),
};

const getSalaries = {
  query: Joi.object().keys({}),
};


module.exports = {
  createSalary,
  getSalaries,
};
