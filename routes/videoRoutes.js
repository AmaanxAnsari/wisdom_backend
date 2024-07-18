import express from "express";
const router = express.Router();
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/fileUpload.js";
import { createVideo, getTags, uploadVideo,getAllVideos,getVideoById,updateVideo,  } from "../controllers/videoController.js";

// try {
//   router.post("/video", upload.single("invoice"), createVideo);
// } catch (error) {
//   console.log(error);
// }
try {
  router.post("/video/upload", upload.single("invoice"), uploadVideo);
  router.post("/video", upload.single("invoice"), createVideo);
  router.get("/tags", getTags);
  router.put("/videos/:id", updateVideo);

  // Route for getting all videos
  router.get("/videos", getAllVideos);

  // Route for getting a video by ID
  router.get("/videos/:id", getVideoById);

} catch (error) {
  console.log(error);
}
export default router;