import  express  from "express";
import {  user } from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const userRouter = express.Router();

userRouter.route("/").get(authMiddleware,user);
export default userRouter ;