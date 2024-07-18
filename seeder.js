import dotenv from "dotenv";
import adminUsers from "./data/adminUserData.js";
import AdminUser from "./models/adminUserModel.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await AdminUser.deleteMany();
    await AdminUser.insertMany(adminUsers);

    console.log("Data Imported.....!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await AdminUser.deleteMany();
    console.log("Data Destroyed.....!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
