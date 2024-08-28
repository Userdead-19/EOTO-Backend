const Newsletter = require("../model/newsLetterSchema");

// Create a new newsletter
exports.createNewsletter = async (req, res) => {
  try {
    const newsletter = new Newsletter(req.body);
    const savedNewsletter = await newsletter.save();
    res.status(201).json(savedNewsletter);
  } catch (error) {
    console.error("Error creating newsletter:", error);
    res.status(500).json({ error: "Failed to create newsletter" });
  }
};

// Get a newsletter by ID
exports.getNewsletterById = async (req, res) => {
  try {
    const newsletter = await Newsletter.findById(req.params.id).populate(
      "sentBy sentTo"
    );
    if (!newsletter) {
      return res.status(404).json({ error: "Newsletter not found" });
    }
    res.status(200).json(newsletter);
  } catch (error) {
    console.error("Error retrieving newsletter:", error);
    res.status(500).json({ error: "Failed to retrieve newsletter" });
  }
};

// Get all newsletters
exports.getAllNewsletters = async (req, res) => {
  try {
    const newsletters = await Newsletter.find({}).populate("sentBy sentTo");
    res.status(200).json(newsletters);
  } catch (error) {
    console.error("Error retrieving newsletters:", error);
    res.status(500).json({ error: "Failed to retrieve newsletters" });
  }
};

// Update a newsletter by ID
exports.updateNewsletterById = async (req, res) => {
  try {
    const updatedNewsletter = await Newsletter.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).populate("sentBy sentTo");
    if (!updatedNewsletter) {
      return res.status(404).json({ error: "Newsletter not found" });
    }
    res.status(200).json(updatedNewsletter);
  } catch (error) {
    console.error("Error updating newsletter:", error);
    res.status(500).json({ error: "Failed to update newsletter" });
  }
};

// Delete a newsletter by ID
exports.deleteNewsletterById = async (req, res) => {
  try {
    const deletedNewsletter = await Newsletter.findByIdAndDelete(req.params.id);
    if (!deletedNewsletter) {
      return res.status(404).json({ error: "Newsletter not found" });
    }
    res.status(200).json({ message: "Newsletter deleted successfully" });
  } catch (error) {
    console.error("Error deleting newsletter:", error);
    res.status(500).json({ error: "Failed to delete newsletter" });
  }
};
