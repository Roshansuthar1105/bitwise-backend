import express from "express"
import { defcontroller } from "../controllers/authController.js";
const app =express();

const router = express.Router();
router.route("/").get(defcontroller);

export default router;