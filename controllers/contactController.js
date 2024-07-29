import Feedback from "../models/feedbackSchema.js";

const contact = async (req, res) => {
  try {
    const { email, message, username } = req.body;
    // const userExist = await User.findOne({ email: email });
    // if (!userExist) {
    //   return res.status(400).send({ message: "user not found Sign Up now" });
    // }
    const newMessage = await Feedback.create({ email, username, message });
    res
      .status(201)
      .json({
        message: newMessage.message,
        userId: newMessage._id.toString(),
        token: await userCreated.generateToken(),
      });
  } catch (error) {
    res.status(400).send(error);
  }
};
export default contact;