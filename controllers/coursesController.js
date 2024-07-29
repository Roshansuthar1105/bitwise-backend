import Course from "../models/courseSchema.js";

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

export default courses;