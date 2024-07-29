import User from "../models/userSchema.js";
import Feedback from "../models/feedbackSchema.js";
import Course from "../models/courseSchema.js";
import bcryptjs from "bcryptjs";
const homePage = async (req, res) => {
  try {
    res.status(202).send("home page");
  } catch (error) {
    res.status(404).send({error});
  }
};
const regPage = async (req, res) => {
  try {
    const { email, password, phone, username } = req.body;
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(400).send({ message: "Email already exist" });
    }
    const userCreated = await User.create({ email, password, phone, username });
    res.status(201).json({
      message: userCreated,
      userId: userCreated._id.toString(),
      token: await userCreated.generateToken(),
    });
  } catch (error) {
    res.status(400).send({error});
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).send({ message: "invalid Credentions" });
    }
    // const isCorrectPassword =await bcryptjs.compare(password,userExist.password);
    const isCorrectPassword = await userExist.compairPassword(password);
    if (isCorrectPassword) {
      res.status(201).send({
        message: "logged In Successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      return res.status(400).send({ message: "invalid Credentions" });
    }
  } catch (error) {
    res.status(500).send({ message: "internal server error" });
  }
};
const contact = async (req, res) => {
  try {
    const { email, message, username } = req.body;
    // const userExist = await User.findOne({ email: email });
    // if (!userExist) {
    //   return res.status(400).send({ message: "user not found Sign Up now" });
    // }
    const newMessage = await Feedback.create({ email, username, message });
    res.status(201).json({"hello ":"hello from contact , message sent",
    message: newMessage.message,
      userId: newMessage._id.toString(),
      token: await userCreated.generateToken(),
    });
  } catch (error) {
    res.status(400).send(error);
  }
};
const user = async (req,res)=>{
  try {
    const user = req.user;
    return res.status(200).json({user});
  } catch (error) {
    res.status(400).json({ message:error });
  }
}
const courses = async(req,res)=>{
  try {
    const response = await Course.find({});
    if(!response){
      return res.status(400).send(`fetching courses error : ${error}`);
    }
    res.status(200).json( {data:response});
  } catch (error) {
    res.status(400).send(`fetching courses error :  ${error}`);
  }
}
const defcontroller = async(req,res)=>{
  try {
    res.status(200).send("hello from def controller");
  } catch (error) {
    res.status(400).send(`fetching courses error :  ${error}`);
  }
}

export { homePage, regPage, login, contact , user ,courses ,defcontroller };
