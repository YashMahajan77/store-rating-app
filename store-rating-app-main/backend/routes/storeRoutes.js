const express = require("express");

const {
  getStores,
  createStore,
} = require("../controllers/storeController");

const {
  authenticateToken,
  authorizeRoles,
} = require("../middleware/auth");

const router = express.Router();

router.get("/", getStores);

router.post(
  "/",
  authenticateToken,
  authorizeRoles("ADMIN"),
  createStore
);

module.exports = router;