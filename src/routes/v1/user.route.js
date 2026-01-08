const express = require("express");
const validate = require("../../middleware/validate");
const auth = require("../../middleware/auth");
const userValidation = require("../../validations/user.validation");
const userController = require("../../controllers/user.controller");

const router = express.Router();

router
  .route("/")
  .post(validate(userValidation.createUser), userController.createUser)
  .get(auth, validate(userValidation.getUsers), userController.getUsers);

  router
  .route("/login")
  .post(validate(userValidation.userLogin), userController.userLogin);

router
  .route("/:email")
  .get(auth, userController.findUserByEmailId);

router.route("/refresh-token").post(validate(userValidation.refreshToken), userController.refreshToken);
router.route("/logout").post(validate(userValidation.logout), userController.logout);

module.exports = router;
