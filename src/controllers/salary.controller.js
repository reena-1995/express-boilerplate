const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { salaryService } = require("../services");

const createSalary = catchAsync(async (req, res) => {
  const salary = await salaryService.createSalary({
    ...req.body,
    user: req.body.user._id,
  });
  res.status(httpStatus.CREATED).send(salary);
});

const getSalaries = catchAsync(async (req, res) => {
  const result = await salaryService.querySalaries();
  res.send(result);
});

const getTopSalaryUsersInYear = catchAsync(async (req, res) => {
  const TOTAL_USERS = 20;
  const year = 2022;
  const result = await salaryService.queryTopSalaryUsersInYear(
    TOTAL_USERS,
    year
  );
  res.send(result);
});

module.exports = {
  createSalary,
  getSalaries,
  getTopSalaryUsersInYear,
};
