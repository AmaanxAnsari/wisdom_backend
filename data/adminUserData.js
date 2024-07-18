import bcrypt from "bcrypt";
const adminUsers = [
  {
    firstName: "Admin",
    lastName: "User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    mobile: "1234567890",
    designation: "Administrator",
    isActive: true,
  },
  {
    firstName: "Johnny",
    lastName: "Doe",
    email: "johndoe@example.com",
    password: bcrypt.hashSync("123456", 10),
    mobile: "0987654321",
    designation: "Developer",
    isActive: true,
  },
  {
    firstName: "Jane",
    lastName: "Doe",
    email: "janedoe@example.com",
    password: bcrypt.hashSync("123456", 10),
    mobile: "9876543210",
    designation: "Designer",
    isActive: true,
  },
];

export default adminUsers;
