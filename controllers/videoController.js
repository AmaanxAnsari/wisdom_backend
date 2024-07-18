import fs from "fs";
import util from "util";
const unLinkFile = util.promisify(fs.unlink);
import uploadFile from "../middleware/s3.js";
import VideoModel from "../models/videoModel.js";
import asyncHandler from "express-async-handler";

const uploadVideo = asyncHandler(async (req, res) => {
  let url = await getInvoiceLocation(req.file);

  // console.log(url);

  if (url) {
    res.status(201).json({ url: url });
  } else {
    throw new Error("Error creating video");
  }
});

const createVideo = asyncHandler(async (req, res) => {
  const { name, description, overview, primaryCategory, url,sessionDate, order } = req.body;
  const tags = JSON.parse(req.body.tags);
  const newVideo = new VideoModel({
    name,
    description,
    primaryCategory,
    overview,
    tags,
    url,
    sessionDate,
    order
  });

  const createdVideo = await newVideo.save();
  if (createdVideo) {
    res.status(201).json(createdVideo);
  } else {
    throw new Error("Error creating video");
  }
});

const getTags = asyncHandler(async (req, res) => {
  try {
    const tags = await VideoModel.distinct("tags");

    if (tags.length > 0) {
      return res.status(200).json(tags);
    } else {
      res.status(404);
      throw new Error("Tags Not Found");
    }
  } catch (err) {
    console.error("Error getting distinct tags:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const uploadFileToS3 = async (file) => {
  const result = await uploadFile(file);
  await unLinkFile(file.path);
  return result;
};

const getInvoiceLocation = async (file) => {
  if (file == null || file == undefined) {
    console.log("Error uploading invoice");
    throw new Error("Error uploading invoice");
  } else {
    let result = await uploadFileToS3(file);
    if (result) {
      // console.info(`file uploaded to S3 successfully`);
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
const getAllVideos = asyncHandler(async (req, res) => {
  const videos = await VideoModel.find().select('name description sessionDate');

  if (videos) {
    res.status(200).json(videos);
  } else {
    throw new Error("Error fetching videos");
  }
});



const getVideoById = asyncHandler(async (req, res) => {
  const videoId = req.params.id;
  // console.log(videoId);

  const video = await VideoModel.findById(videoId).select('name description primaryCategory tags url sessionDate order');

  if (video) {
    res.status(200).json(video);
  } else {
    res.status(404).json({ message: "Video not found" });
  }
});

// videoController.js

const updateVideo = asyncHandler(async (req, res) => {
  const videoId = req.params.id;
  const { name, description, overview, primaryCategory, url, tags,sessionDate, order } = req.body;
  let updatedURL=url;
  const file = req.body.file;
  if(file){
    updatedURL= await getInvoiceLocation(file)
  }

  try {
    // Check if the new order already exists for another video
    const existingVideoWithOrder = await VideoModel.findOne({ order: order });

    if (existingVideoWithOrder && existingVideoWithOrder._id.toString() !== videoId) {
      // If order already exists for another video, adjust orders
      await Video.updateMany(
        { order: { $gte: order } }, // Find videos with order greater than or equal to the new order
        { $inc: { order: 1 } } // Increment their order by 1
      );
    }

    // Update the video with the new order
    const updatedVideo = await VideoModel.findByIdAndUpdate(
      videoId,
      {
        $set: {
          name,
          description,
          overview,
          primaryCategory,
          url,
          tags,
          sessionDate
      },
      });

    res.status(200).json(updatedVideo);
  } catch (error) {
    console.error('Error updating video:', error);
    res.status(500).json({ error: 'Video not found' });
  }
});



export { createVideo, getAllVideos, getVideoById, uploadVideo, getTags, updateVideo, };




