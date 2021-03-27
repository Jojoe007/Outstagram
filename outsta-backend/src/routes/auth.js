const express = require("express");
const router = express.Router();
const { login, register, me} = require("../controllers/authController");
const { protect } = require("../middlewares/auth");

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/me").get(protect, me);

module.exports = router;
