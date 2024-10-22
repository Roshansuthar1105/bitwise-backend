import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
// import  from "";
dotenv.config();
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  watchlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],
});


userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    next();
  }
  try {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(user.password, salt);
    user.password = hashedPassword;
  } catch (error) {
    next(error);
  }
});

userSchema.methods.generateToken = async function () {
  try {
    const secretkey = process.env.JWT_SECRET || "defaultSecretKey";
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      secretkey,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.error(error);
  }
};
userSchema.methods.compairPassword = async function (e) {
    try {
        return bcryptjs.compare(e ,this.password);
    } catch (error) {
        console.error(error)
    }
}
const User = mongoose.model("User", userSchema);
export default User;
