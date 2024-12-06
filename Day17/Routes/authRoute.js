const express = require("express");
const router = express.Router();
const user = require("./../Controllers/authController");

router.route("/signup").get(user.getdata);
router.route("/signup").post(user.signup);
router.route("/login").post(user.login);
router.route("/signup/:id").delete(user.deleteuser);
router.route("/forgotpassword").post(user.forgotpassword);
router.route("/resetpassword").post(user.passwordRest);
module.exports = router;
