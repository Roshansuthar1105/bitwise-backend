import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({message:"Unauthorised http token not provided !"});
  }
  const jwtToken = token.replace("Bearer", "").trim();
  try {
    const isVerrified = jwt.verify(jwtToken, process.env.JWT_SECRET);
    const userData = await User.findOne({ email: isVerrified.email }).select({
      password: 0,
    });
    req.user = userData;
    req.userId=userData._id;
    req.token=jwtToken;
    next();
  } catch (error) {
    res.status(400).json({"message":"Unauthorised http token not provided !"});
  }
};
export default authMiddleware;
