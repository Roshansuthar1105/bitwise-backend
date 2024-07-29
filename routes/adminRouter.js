import express from "express";
import * as adminController from "../controllers/adminController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
const adminRouter = express.Router();
adminRouter
  .route("/users")
  .get(authMiddleware, adminMiddleware, adminController.getAllUsers);
adminRouter
  .route("/contacts")
  .get(authMiddleware, adminMiddleware, adminController.getAllContacts);
adminRouter
  .route("/courses")
  .get(authMiddleware, adminMiddleware, adminController.getAllCourses);
adminRouter
  .route("/contacts/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteContact);
adminRouter
  .route("/users/:id")
  .get(authMiddleware, adminMiddleware, adminController.findOneUser);
adminRouter
  .route("/users/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteUser);
adminRouter
  .route("/users/update/:id")
  .patch(authMiddleware, adminMiddleware, adminController.updateOneUser);
export default adminRouter;
