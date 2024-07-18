import asyncHandler from "express-async-handler";
import CourseModel from "../models/courseModel.js";
import StudentModel from "../models/studentModel.js";
import VideoModel from "../models/videoModel.js";
import generateToken from "../utils/generateToken.js";

const authStudentUser = asyncHandler(async (req, res) => {
  // console.log("Admin Login");
  const { email, password } = req.body;

  const studentUser = await StudentModel.findOne({ email });

  if (studentUser && (await studentUser.matchPassword(password))) {
    return res.json({
      _id: studentUser._id,
      firstName: studentUser.name,
      lastName: studentUser.name,
      email: studentUser.email,
      token: generateToken(studentUser._id),
      type: "student",
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});


const createStudent = asyncHandler(async (req, res) => {
  let { firstName, lastName, email, password, mobile, courses } = req.body;

  // Validate email and mobile number
  if (!isEmailValid(email) || !isMobileNumberValid(mobile)) {
    res.status(400).json({
      message: "Invalid e-mail or mobile number",
    });
    return; // Return to exit the function if validation fails
  }

  // Check if a student with the given mobile number already exists
  const oldStudent = await StudentModel.findOne({ mobile });

  if (oldStudent) {
    res.status(400);
    throw new Error("Dealer with the given mobile number already exists.");
  }

  const student = await StudentModel.create({
    firstName,
    lastName,
    email,
    password,
    mobile,
    courses,
  });

  if (student) {
    // console.log("Request Payload:", req.body);
    res.status(201).json({
      _id: student._id,
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      mobile: student.mobile,
      mobileVerified: student.mobileVerified,
      emailVerified: student.emailVerified,
      isActive: student.isActive,
      courses: student.courses,
    });
  } else {
    res.status(400).json({
      message: "Invalid student data",
    });
  }
});

const getStudents = asyncHandler(async (req, res) => {
  const students = await StudentModel.find({ isDeleted: false })
    .select("lastName firstName mobile")
    .populate("courses", "name")
    .lean();
  // console.log("Students ", students);
  if (students) {
  //  console.log("getStudentsTriggred");

    return res.status(200).json(students);
  } else {
    res.status(404);
    throw new Error("Students Not Found");
  }
});


const getStudentById = asyncHandler(async (req, res) => {
    const student = await StudentModel.findById(req.params.id, { password: 0, __v: 0 });
    if (student) {
      // console.log("getStudentById triggred")
		return (res.json(student));
	} else {
		res.status(404);
		throw new Error("Invalid dealer Id");
	}
});

const updateStudent = asyncHandler(async (req, res) => {
  const studentId = req.params.id; // Get the student ID from the route parameter
  const student = await StudentModel.findById(studentId);

  if (!student) {
    res.status(404).json({ message: "Student not found" });
  }

  if (student) {
    student.firstName = req.body.firstName || student.firstName;
    student.lastName = req.body.lastName || student.lastName;
    student.email = req.body.email || student.email;

    student.password = req.body.password || student.password;
    student.courses = req.body.courses || student.courses;
    student.mobileVerified = req.body.mobileVerified==="Yes"? true:(true) || student.mobileVerified;
    student.mobileVerified = req.body.mobileVerified==="No"? false:(false) || student.mobileVerified;
    student.emailVerified = req.body.emailVerified==="Yes"? true:(true) || student.emailVerified;
    student.emailVerified = req.body.emailVerified==="No"? false:(false) || student.emailVerified;
    student.isActive = req.body.isActive==="Yes"? true : (true)  || student.isActive;
    student.isActive = req.body.isActive==="No"? false : (false)  || student.isActive;
    student.isDeleted = req.body.isDeleted === "Yes";
    const updateStudent = await student.save();

    res.json({
      firstName: updateStudent.firstName,
      courses: updateStudent.courses,
      lastName: updateStudent.lastName,
      email: updateStudent.email,
      password: updateStudent.password,
      mobile: updateStudent.mobile,
      mobileVerified: updateStudent.mobileVerified,
      emailVerified: updateStudent.emailVerified,
      isActive: updateStudent.isActive,
      isDeleted: updateStudent.isDeleted,
    });
  } else {
    res.status(404);
    throw new Error("student not found");
  }
});

const courseVideos = asyncHandler(async (req, res) => {
  try {
    const courseId = req.params.id;

    // Find document from Collection1 based on the provided id
    const course = await CourseModel.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Extract the array of video ids from course
    const videoIds = course.videos;

    // Find documents from courses based on the array of ids
    const videoData = await VideoModel.find({ _id: { $in: videoIds } });
    // console.log(videoData);

    res.json(videoData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }


  // const video = await VideoModel.findById(videoId).select('name description primaryCategory tags url ');

  // if (video) {
  //   res.status(200).json(video);
  // } else {
  //   res.status(404).json({ message: "Video not found" });
  // }
});



const getTotalCounts = async (req, res) => {
  try {
    // Get total students count
    const totalStudentsCount = await StudentModel.find({ isDeleted: false }).countDocuments();
    // const totalDeletedStudentsCount = await StudentModel.find({ isDeleted: true }).countDocuments();

    const totalCoursesCount = await CourseModel.find({ isDeleted: false }).countDocuments();
    // const totalDeletedCoursesCount = await CourseModel.find({ isDeleted: true }).countDocuments();

    res.status(200).json({
      totalStudents: totalStudentsCount,
      totalCourses: totalCoursesCount,
      // totalDeletedCourses:totalDeletedCoursesCount,
      // totalDeletedStudents:totalDeletedStudentsCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




const studentVideosById = asyncHandler(async (req, res) => {
  try {
    const studentId = req.params.id;

    const student = await StudentModel.findById(studentId);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const coursesIds = student.courses;
    // console.log(coursesIds);

    // Find documents from courses based on the array of ids
    const coursesData = await CourseModel.distinct('videos',{ _id: { $in: coursesIds } });

    if (!coursesData) {
      return res.status(404).json({ error: 'Courses not found' });
    }

    // Find documents from courses based on the array of ids
    const videoData = await VideoModel.find({ _id: { $in: coursesData } });
    // console.log(videoData);

    res.json(videoData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }


  // const video = await VideoModel.findById(videoId).select('name description primaryCategory tags url ');

  // if (video) {
  //   res.status(200).json(video);
  // } else {
  //   res.status(404).json({ message: "Video not found" });
  // }
});

const studentCourses = asyncHandler(async (req, res) => {
  try {
    const studentId = req.params.id;

    // Find document from Collection1 based on the provided id
    const student = await StudentModel.findById(studentId);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Extract the array of courses ids from student
    const coursesIds = student.courses;

    // Find documents from courses based on the array of ids
    const coursesData = await CourseModel.find({ _id: { $in: coursesIds } });

    if (!coursesData) {
      return res.status(404).json({ error: 'Courses not found' });
    }

    res.json(coursesData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }


  // const video = await VideoModel.findById(videoId).select('name description primaryCategory tags url ');

  // if (video) {
  //   res.status(200).json(video);
  // } else {
  //   res.status(404).json({ message: "Video not found" });
  // }
});

function isEmailValid(email) {
  var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,}$/;
  return emailRegex.test(email);
}

function isMobileNumberValid(mobile) {
  var mobileNumberRegex = /^\d{10}$/;
  return mobileNumberRegex.test(mobile);
}

export { createStudent, getStudentById, getStudents, studentVideosById, updateStudent,studentCourses,courseVideos,authStudentUser, getTotalCounts };

