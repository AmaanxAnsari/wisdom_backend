import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const courseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    overview: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    primaryCategory: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    course_thumbnail: {
      type: String,
    },
    batchstart: {
      type: String,
      required: true,
    },
    batchend: { type: String, required: true },
    categories: [String],
    technologies: [String],
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        enrollDate: Date,
        completionDate: Date,
      },
    ],
    videos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
        enrollDate: Date,
        completionDate: Date,
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
