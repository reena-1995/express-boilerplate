const express = require("express");
const validate = require("../../middleware/validate");
const salaryValidation = require("../../validations/salary.validation");
const salaryController = require("../../controllers/salary.controller");

const router = express.Router();

router
  .route("/")
  .post(validate(salaryValidation.createSalary), salaryController.createSalary)
  .get(validate(salaryValidation.getSalaries), salaryController.getSalaries);

router
  .route("/top-user-in-year")
  .get(
    validate(salaryValidation.getSalaries),
    salaryController.getTopSalaryUsersInYear
  );

module.exports = router;
