import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import AdminUser from "../models/adminUserModel.js";

const protect = (modelName) =>
  asyncHandler(async (req, res, next) => {
    // console.log('here');
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        let user;
        if (modelName === "AdminUser") {
          user = await AdminUser.findById(decoded.id).select("-password");
        } else {
          throw new Error("Invalid model name");
        }
        req.user = user;
        next();
      } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error("Not authorized, no token");
      }
    }

    if (!token) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  });

export default protect;
