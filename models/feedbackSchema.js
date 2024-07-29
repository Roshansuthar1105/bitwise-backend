import mongoose from "mongoose"

const feedbackSchema =mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
})
const Feedback = mongoose.model("Feedback",feedbackSchema);
export default Feedback;