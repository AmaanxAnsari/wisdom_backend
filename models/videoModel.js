  import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const videoSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    primaryCategory: {
      type: String,
      required: true,
    },
    tags: [String],
    url: {
      type: String,
      required: true,
    },
    sessionDate: {
      type: Date,
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
  },
  // {
  //   timestamps: true,
  // }
);

const Video = mongoose.model("Video", videoSchema);

export default Video;
