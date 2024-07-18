import CourseModel from "../models/courseModel.js";
import asyncHandler from "express-async-handler";
import uploadFile from "../middleware/s3.js";
import fs from "fs";
import util from "util";
const unLinkFile = util.promisify(fs.unlink);

const uploadFileToS3 = async (file) => {
  const result = await uploadFile(file);
  await unLinkFile(file.path);
  return result;
};
const getIconLocation = async (file) => {
  console.log("getIconLocation called");
  if (file == null || file == undefined) {
    console.log("error 1 called");

    logger.error("Error uploading invoice");
    throw new Error("Error uploading invoice");
  } else {
    let result = await uploadFileToS3(file);
    if (result) {
      console.info(`file uploaded to S3 successfully`);
      return result.Location;
    } else {
      console.error("Issue uploading file to S3");
      res.status(500).send({
        status: "failed",
        messages: "Error uploading file",
      });
      return;
    }
  }
};
const createCourse = asyncHandler(async (req, res) => {
  let {
    name,
    description,
    overview,
    image,
    primaryCategory,
    duration,
    categories,
    technologies,
    course_thumbnail,
    students,
    videos,
    batchstart,
    batchend,
  } = req.body;

  const oldCourse = await CourseModel.findOne({ name });

  if (oldCourse) {
    res.status(400);
    throw new Error("Course with given name");
  }
  let icon = "";

  if (req.file) {
    try {
      // Assuming you have a function like getIconLocation for getting the icon location
      let iconPath = await getIconLocation(req.file);
      icon = iconPath;
    } catch (e) {
      res.status(500).send({ message: e.stack });
    }
  }

  const course = await CourseModel.create({
    name,
    description,
    overview,
    image,
    primaryCategory,
    duration,
    categories,
    technologies,
    students,
    videos,
    course_thumbnail: icon,
    batchstart,
    batchend,
  });

  if (course) {
    // console.log("Request Payload:", req.body);
    res.status(201).json({
      _id: course._id,
      name: course.name,
      description: course.description,
      overview: course.overview,
      image: course.image,
      primaryCategory: course.primaryCategory,
      duration: course.duration,
      categories: course.categories,
      technologies: course.technologies,
      students: course.students,
      course_thumbnail: course.course_thumbnail,
      videos: course.students,
      bactchstart: course.batchstart,
      bactchend: course.batchend,
    });
  } else {
    res.status(400).json({
      message: "Invalid course data",
    });
  }
});

const getAllCourses = asyncHandler(async (req, res) => {
  const courses = await CourseModel.find({ isDeleted: false })
    .populate("videos", "name")
    .populate("students", "firstName");

  res.status(200).json(courses);
  console.log("GETALLCOURSES TRIGGRED");
});

const getCourseById = asyncHandler(async (req, res) => {
  const courseId = req.params.id;

  const course = await CourseModel.findById(courseId);

  if (course) {
    console.log("getCourseById triggred");
    res.status(200).json(course);
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});

const updateCourse = asyncHandler(async (req, res) => {
  // const course = await CourseModel.findById(req.params.courseId);
  // console.log("courseID: ",req.body.courseId)
  const courseId = req.params.id; // Get the student ID from the route parameter
  const course = await CourseModel.findById(courseId);

  if (!course) {
    res.status(404).json({ message: "course not found" });
  }
  let icon = course.course_thumbnail || ""; // Use existing icon if available

  if (req.file) {
    try {
      // Assuming you have a function like getIconLocation for getting the icon location
      let iconPath = await getIconLocation(req.file);
      icon = iconPath;
    } catch (e) {
      res.status(500).json({ message: e.stack });
      return;
    }
    console.log("Icon From Controller", icon);
  }
  if (course) {
    course.name = req.body.name || course.name;
    course.description = req.body.description || course.description;
    course.overview = req.body.overview || course.overview;
    course.image = req.body.image || course.image;
    course.primaryCategory = req.body.primaryCategory || course.primaryCategory;
    course.duration = req.body.duration || course.duration;
    course.categories = req.body.categories || course.categories;
    course.technologies = req.body.technologies || course.technologies;
    course.videos = req.body.videos || course.videos;
    course.batchstart = req.body.batchstart || course.batchstart;
    course.batchend = req.body.batchend || course.batchend;
    course.students = req.body.students || course.students;
    course.course_thumbnail = icon;
    // course.isDeleted = req.body.isDeleted==="No"? false : (false)  || course.isDeleted;
    // // course.isDeleted = req.body.isDeleted==="Yes"? true : (true)  || course.isDeleted;
    // // course.isDeleted = req.body.isDeleted || course.isDeleted;
    // course.isDeleted = req.body.isDeleted==="Yes"? true : (true)  || course.isDeleted;
    // course.isDeleted = req.body.isDeleted || course.isDeleted;
    course.isDeleted = req.body.isDeleted === "Yes";

    const updateCourse = await course.save();

    res.json({
      name: updateCourse.name,
      description: updateCourse.description,
      overview: updateCourse.overview,
      image: updateCourse.image,
      primaryCategory: updateCourse.primaryCategory,
      duration: updateCourse.duration,
      categories: updateCourse.categories,
      technologies: updateCourse.technologies,
      videos: updateCourse.videos,
      students: updateCourse.students,
      course_thumbnail: updateCourse.course_thumbnail,
      isDeleted: updateCourse.isDeleted,
      batchstart: updateCourse.batchstart,
      batchend: updateCourse.batchend,
    });
  } else {
    res.status(404);
    throw new Error("course not found");
  }
});

export { createCourse, getAllCourses, getCourseById, updateCourse };
