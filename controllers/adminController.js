import Course from "../models/courseSchema.js";
import Feedback from "../models/feedbackSchema.js";
import User from "../models/userSchema.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({},{password:0});
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "no User found " });
    }
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Feedback.find();
    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ message: "no feedback found" });
    }
    return res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    if (!courses || courses.length === 0) {
      return res.status(404).json({ message: "no course found " });
    }
    return res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};
const findOneUser = async (req,res)=>{
  try {
    const Id =await req.params.id;
    const user = await User.findOne({_id:Id},{password:0});
    return res.status(200).json(user);
  } catch (error) {
    console.log(error)
    next(error);
  }
}
const updateOneUser = async (req,res)=>{
  try{
    const id = req.params.id;
    const userData = req.body;
    const updatedData = await User.updateOne({_id:id},{$set : userData});
    return res.status(200).json(updatedData);
  }catch(error){
    next(error);
  }
}
const deleteUser = async (req,res)=>{
  try {
    const deleteId =await req.params.id;
    await User.deleteOne({_id:deleteId});
    return res.status(200).json({message:"User Deleted successfully"});
  } catch (error) {
    console.log(error)
    next(error);
  }
}
const deleteContact = async (req,res)=>{
  try {
    const deleteId =await req.params.id;
    const dlt =  await Feedback.deleteOne({_id:deleteId});
    return res.status(200).json({message:"Contact Deleted successfully"});
  } catch (error) {
    console.log("error from contact", error)
    next(error);
  }

}
export { getAllUsers , getAllContacts , deleteContact ,getAllCourses , deleteUser, findOneUser ,updateOneUser };
