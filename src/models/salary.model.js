const mongoose = require("mongoose");

const salarySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    creditDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);



/**
 * @typedef Salary
 */
const Salary = mongoose.model("Salary", salarySchema);

module.exports = Salary;
