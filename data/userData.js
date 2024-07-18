import bcrypt from "bcrypt";

const users = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    password: bcrypt.hashSync("123456", 10),
    mobile: "1234567890",
    address: "123 Main St, Anytown USA",
    isPhoneNumberVerified: true,
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    email: "janesmith@example.com",
    password: bcrypt.hashSync("123456", 10),
    mobile: "0987654321",
    address: "456 Oak St, Anytown USA",
    isPhoneNumberVerified: false,
  },
];

export default users;
