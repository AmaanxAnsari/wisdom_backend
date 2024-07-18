import express from "express";
const router = express.Router();
import protect from "../middleware/authMiddleware.js";
import { createStudent, getStudents, getStudentById, updateStudent, studentVideosById, studentCourses, courseVideos, authStudentUser,getTotalCounts } from "../controllers/studentController.js";

// @desc Register new admin user
// @route POST /api/adminUsers
// @access Private/Admin
router.route("/student").post(protect("AdminUser"), createStudent);
router.route("/student").get(protect("AdminUser"), getStudents);
router.route("/student/:id").get(protect("AdminUser"), getStudentById);
// router.route("/student").put(protect("AdminUser"), updateStudent);
router.route("/student/:id").put(protect("AdminUser"), updateStudent);
router.route("/studentVideos/:id").get(studentVideosById);
router.route("/counts").get(protect("AdminUser"), getTotalCounts);
router.route("/courseVideos/:id").get(courseVideos);
router.route("/studentCourses/:id").get(studentCourses);

router.route("/student/login").post(authStudentUser);

// router.route("/admin/:id").get(protect("AdminUser"), getAdminUserProfile);

export default router;
