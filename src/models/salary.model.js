const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

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

// add plugin that converts mongoose to json
salarySchema.plugin(toJSON);
salarySchema.plugin(paginate);


/**
 * @typedef Salary
 */
const Salary = mongoose.model("Salary", salarySchema);

module.exports = Salary;
