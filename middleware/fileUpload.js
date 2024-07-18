import multer from "multer";
import fs from "fs";

var dir = "./public"; // PATH TO UPLOAD FILE
if (!fs.existsSync(dir)) {
  // CREATE DIRECTORY IF NOT FOUND
  fs.mkdirSync(dir, { recursive: true });
}
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "-" + file.originalname.toLowerCase().split(" ").join("-")
    );
  },
});
const upload = multer({
  storage: fileStorageEngine,
  fileFilter: (req, file, cb) => {
    // console.log(file);

    if(file == null || file == undefined) {
      return cb(new Error("File not found"));
    }
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype ==  "text/csv" ||
      file.mimetype ==  "video/mp4"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});
export default upload;
