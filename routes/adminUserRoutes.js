import express from "express";
const router = express.Router();
import protect from "../middleware/authMiddleware.js";
import {
  authAdminUser,
  registerAdminUser,
  getAdminUserProfile,
  updateAdminUserProfile,
} from "../controllers/adminUserController.js";

// @desc Auth admin user & Get token
// @route POST /api/adminUsers/login
// @access Public
router.post("/admin/login", authAdminUser);

// @desc Register new admin user
// @route POST /api/adminUsers
// @access Private/Admin
router.route("/admin/user").post(protect("AdminUser"), registerAdminUser);
router.route("/admin/:id").get(protect("AdminUser"), getAdminUserProfile);

// @desc Auth admin user & Get token
// @route GET /api/adminUsers/profile
// @access Private/Admin
router
  .route("/admin/profile")
  .put(protect("AdminUser"), updateAdminUserProfile);

export default router;
