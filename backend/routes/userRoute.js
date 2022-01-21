const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  userProfile,
  getUserById,
  getAllUsers,
} = require("../controllers/userController");
const { isAuthenticated, isAdmin, verifyJWT } = require("../middleware/auth");
const router = express.Router();

router.route("/user/register").post(registerUser);
router.route("/user/login").post(loginUser);
router.route("/user/logout").get(logoutUser);

router.route("/me").get(isAuthenticated, userProfile);

router.route("/getuser/:id").get(isAuthenticated, isAdmin, getUserById);
router.route("/getusers").get(isAuthenticated, isAdmin, getAllUsers);

module.exports = router;
