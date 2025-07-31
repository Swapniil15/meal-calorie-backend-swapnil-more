const Feedback = require("../models/Feedback");

const sendFeedback = async (req, res) => {
  try {
    const { rating, feedback, dish_name } = req.body;
    const user = req.user;

    if (!feedback || !rating || !dish_name) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existing = await Feedback.findOne({
      userId: user._id,
      dish_name,
    });

    if (existing) {
      existing.feedback = feedback;
      existing.rating = rating;
      await existing.save();

      return res.status(200).json({ message: "Feedback updated successfully" });
    }

    const newFeedback = new Feedback({
      userId: user._id,
      username: `${user.first_name} ${user.last_name}`,
      rating,
      feedback,
      dish_name,
    });

    await newFeedback.save();

    res.status(200).json({ message: "Feedback saved successfully" });
  } catch (err) {
    console.error("Feedback error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  sendFeedback,
};
