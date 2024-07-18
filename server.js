import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import adminUserRoutes from "./routes/adminUserRoutes.js";
import studentRoutes from "./routes/studentRoutes.js"
import courseRoutes from "./routes/courseRoutes.js"
import videoRoutes from "./routes/videoRoutes.js"
import logger from "./utils/logger.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
connectDB();

app.get("/", (req, res) => {
  res.send("API running");
});

app.use("/api", adminUserRoutes); // Add this line to use userRoutes
app.use("/api", studentRoutes);
app.use("/api", courseRoutes);
app.use("/api", videoRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3011;
app.listen(PORT, () =>
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
