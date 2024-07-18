import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const studentSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      // required: true,
    },
    mobile: {
      type: Number,
      required: true,
      unique: true,
    },
    mobileVerified: {
      type: String,
      default: false,
    },
    emailVerified: {
      type: String,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Course",
            enrollDate: Date,
            completionDate: Date,
        }
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
  
);

studentSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
