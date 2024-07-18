import asyncHandler from "express-async-handler";
import AdminUser from "../models/adminUserModel.js";
import generateToken from "../utils/generateToken.js";
import mongoose from "mongoose";

// @desc Auth admin user & Get token
// @route POST /api/adminUsers/login
// @access Public
const authAdminUser = asyncHandler(async (req, res) => {
  // console.log("Admin Login");
  const { email, password } = req.body;

  const adminUser = await AdminUser.findOne({ email });

  if (adminUser && (await adminUser.matchPassword(password))) {
    return res.json({
      _id: adminUser._id,
      firstName: adminUser.name,
      lastName: adminUser.name,
      email: adminUser.email,
      token: generateToken(adminUser._id),
      type: adminUser.type,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc Register new admin user
// @route POST /api/adminUsers
// @access Private/Admin
const registerAdminUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, mobile } = req.body;

  const adminUserExists = await AdminUser.findOne({ email });
  if (adminUserExists) {
    res.status(400);
    throw new Error("Admin user already exists");
  }
  const adminUser = await AdminUser.create({
    firstName,
    lastName,
    email,
    password,
    mobile,
  });
  if (adminUser) {
    res.status(201).json({
      _id: adminUser._id,
      firstName: adminUser.firstName,
      lastName: adminUser.lastName,
      email: adminUser.email,
      token: generateToken(adminUser._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid admin user data");
  }
});

// @desc Auth admin user & Get token
// @route GET /api/adminUsers/profile
// @access Private/Admin
const getAdminUserProfile = asyncHandler(async (req, res) => {
  const adminUser = await AdminUser.findById(req.params.id);

  if (adminUser) {
    return res.json({
      _id: adminUser._id,
      firstName: adminUser.firstName,
      lastName: adminUser.lastName,
      email: adminUser.email,
      token: generateToken(adminUser._id),
      type: adminUser.type,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc Update admin user profile
// @route PUT /api/adminUsers/profile
// @access Private/Admin
const updateAdminUserProfile = asyncHandler(async (req, res) => {
  const adminUser = await AdminUser.findById(req.user._id);

  if (adminUser) {
    adminUser.name = req.body.name || adminUser.name;
    adminUser.email = req.body.email || adminUser.email;
    adminUser.designation = req.body.designation || adminUser.designation;
    adminUser.mobile = req.body.mobile || adminUser.mobile;

    if (req.body.password) {
      adminUser.password = req.body.password;
    }

    const updatedAdminUser = await adminUser.save();

    res.json({
      _id: updatedAdminUser._id,
      firstName: updatedAdminUser.firstName,
      lastName: updatedAdminUser.lastName,
      email: updatedAdminUser.email,
      token: generateToken(updatedAdminUser._id),
    });
  } else {
    res.status(404);
    throw new Error("Admin user not found");
  }
});

export {
  authAdminUser,
  registerAdminUser,
  getAdminUserProfile,
  updateAdminUserProfile,
};
