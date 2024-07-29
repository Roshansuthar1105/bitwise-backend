import  express  from "express";
import { contactSchema } from "../validations/authValidation.js";
import { contact } from "../controllers/authController.js";
import validate from "../middlewares/validateMiddleware.js";
const contactRouter = express.Router();

contactRouter.route("/").post(validate(contactSchema),contact);
export default contactRouter ;