const express = require("express");

const {
  getOwnerDashboard,
} = require("../controllers/storeOwnerController");

const {
  authenticateToken,
  authorizeRoles,
} = require("../middleware/auth");

const router = express.Router();

router.get(
  "/dashboard",
  authenticateToken,
  authorizeRoles("STORE_OWNER"),
  getOwnerDashboard
);

module.exports = router;