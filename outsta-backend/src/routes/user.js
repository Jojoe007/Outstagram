const express = require("express");
const router = express.Router();
const {
    getUsers,
    editUser
} = require("../controllers/userController");
const { protect } = require("../middlewares/auth");

router.route("/").get(protect, getUsers);
router.route("/edit").get(protect, editUser);

module.exports = router;