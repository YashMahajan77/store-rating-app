const express = require("express");

const {
  getUsers,
  createUser,
  getUserById,
  getAdminDashboard,
} = require("../controllers/userController");

const {
  authenticateToken,
  authorizeRoles,
} = require("../middleware/auth");

const router = express.Router();

router.get(
  "/",
  authenticateToken,
  authorizeRoles("ADMIN"),
  getUsers
);

router.post(
  "/",
  authenticateToken,
  authorizeRoles("ADMIN"),
  createUser
);

router.get(
  "/dashboard",
  authenticateToken,
  authorizeRoles("ADMIN"),
  getAdminDashboard
);

router.get(
  "/:id",
  authenticateToken,
  authorizeRoles("ADMIN"),
  getUserById
);

module.exports = router;