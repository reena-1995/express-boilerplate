const httpStatus = require("http-status");
const { Salary } = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * Create a salary
 * @param {Object} salaryBody
 * @returns {Promise<Salary>}
 */
const createSalary = async (salaryBody) => {
  return Salary.create(salaryBody);
};

/**
 * Query for salaries
 * @returns {Promise<QueryResult>}
 */
const querySalaries = async () => {
  const salaries = await Salary.find().populate("user");
  return salaries;
};

/**
 * Query for salaries
 * @returns {Promise<QueryResult>}
 */
const queryTopSalaryUsersInYear = async (totalUsers, year) => {
  console.log(year, "year");
  const salaries = await Salary.aggregate([
    { $group: { _id: "$user", salary: { $sum: "$salary" } } },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
    { $sort: { salary: -1 } },
    { $limit: 20 },
  ]);
  return salaries;
};

module.exports = {
  createSalary,
  querySalaries,
  queryTopSalaryUsersInYear,
};
