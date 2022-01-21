const express = require("express");
const {
  createCanteen,
  getAllCanteens,
  getCanteenById,
  updateCanteenById,
  updateCanteenMenuById,
  removeCanteenById,
  getItemBySearch,
} = require("../controllers/canteenController");
const { isAuthenticated, isAdmin } = require("../middleware/auth");

const router = express.Router();
// Create
router.route("/canteen/new").post(isAuthenticated, isAdmin, createCanteen);

//Read
router.route("/canteen/:id").get(getCanteenById);

router.route("/canteens").get(getAllCanteens);

//update
router
  .route("/update/canteen/:id")
  .put(isAuthenticated, isAdmin, updateCanteenById);
router
  .route("/updatemenu/canteen/:id")
  .put(isAuthenticated, isAdmin, updateCanteenMenuById);

//delete
router
  .route("/delete/canteen/:id")
  .delete(isAuthenticated, isAdmin, removeCanteenById);

//This is not completed till now
router.route("/getmenu").post(getItemBySearch);

module.exports = router;
