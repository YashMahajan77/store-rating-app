const express = require("express");

const {
  submitRating,
} = require("../controllers/ratingController");

const {
  authenticateToken,
  authorizeRoles,
} = require("../middleware/auth");

const router = express.Router();

router.post(
  "/",
  authenticateToken,
  authorizeRoles("USER"),
  submitRating
);

module.exports = router;