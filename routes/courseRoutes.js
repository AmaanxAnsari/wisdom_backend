import express from "express";
const router = express.Router();
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/fileUpload.js";

import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
} from "../controllers/courseController.js";

router
  .route("/course")
  .post(protect("AdminUser"), upload.single("file"), createCourse);
router.route("/course").get(protect("AdminUser"), getAllCourses);
router.route("/course/:id").get(protect("AdminUser"), getCourseById);
// router.route("/course").put(protect("AdminUser"), updateCourse);
router
  .route("/course/:id")
  .post(protect("AdminUser"), upload.single("file"), updateCourse);

export default router;
