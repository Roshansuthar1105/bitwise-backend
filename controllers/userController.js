import User from "../models/userSchema.js";
import Course from "../models/courseSchema.js";
export const toggleWatchlist = async (req, res) => {
  const { courseId } = req.body;
  const userId = req.user.id; // Assuming you're using authMiddleware to get the user
  // const userId = req.params.userId;
  // console.log(userId);
  try {
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user || !course) {
      return res.status(404).json({ error: "User or Course not found" });
    }

    // Check if course is already in the watchlist
    const courseIndex = user.watchlist.indexOf(courseId);
    if (courseIndex === -1) {
      // If course is not in the watchlist, add it
      user.watchlist.push(courseId);
      await user.save();
      res.status(200).json({ message: "Course added to watchlist" });
    } else {
      // If course is in the watchlist, remove it
      user.watchlist.splice(courseIndex, 1);
      await user.save();
      res.status(200).json({ message: "Course removed from watchlist" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get the user's watchlist
export const getWatchlist = async (req, res) => {
  // const userId = req.params.userId;
  const userId = req.user.id; // Assuming you're using authMiddleware to get the user

  try {
    const user = await User.findById(userId).populate("watchlist");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ watchlist: user.watchlist });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
export const user = async (req, res) => {
  try {
    const user = req.user;
    // const list =await user.populate("watchlist")  ;
    // console.log(list,"user.....")
    return res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
