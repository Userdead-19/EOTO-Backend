const Group = require("../model/GroupSchema");

// Create a new group
exports.createGroup = async (req, res) => {
  try {
    const group = new Group(req.body);
    const savedGroup = await group.save();
    res.status(201).json(savedGroup);
  } catch (error) {
    console.error("Error creating group:", error);
    res.status(500).json({ error: "Failed to create group" });
  }
};

// Get a group by ID
exports.getGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id).populate(
      "createdBy members.userId"
    );
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }
    res.status(200).json(group);
  } catch (error) {
    console.error("Error retrieving group:", error);
    res.status(500).json({ error: "Failed to retrieve group" });
  }
};

// Get all groups
exports.getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find({}).populate("createdBy members.userId");
    res.status(200).json(groups);
  } catch (error) {
    console.error("Error retrieving groups:", error);
    res.status(500).json({ error: "Failed to retrieve groups" });
  }
};

// Update a group by ID
exports.updateGroupById = async (req, res) => {
  try {
    const updatedGroup = await Group.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).populate("createdBy members.userId");
    if (!updatedGroup) {
      return res.status(404).json({ error: "Group not found" });
    }
    res.status(200).json(updatedGroup);
  } catch (error) {
    console.error("Error updating group:", error);
    res.status(500).json({ error: "Failed to update group" });
  }
};

// Delete a group by ID
exports.deleteGroupById = async (req, res) => {
  try {
    const deletedGroup = await Group.findByIdAndDelete(req.params.id);
    if (!deletedGroup) {
      return res.status(404).json({ error: "Group not found" });
    }
    res.status(200).json({ message: "Group deleted successfully" });
  } catch (error) {
    console.error("Error deleting group:", error);
    res.status(500).json({ error: "Failed to delete group" });
  }
};

// Add a member to a group
exports.addMemberToGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    const newMember = {
      userId: req.body.userId,
      role: req.body.role || "member",
    };

    group.members.push(newMember);
    await group.save();

    res.status(200).json(group);
  } catch (error) {
    console.error("Error adding member to group:", error);
    res.status(500).json({ error: "Failed to add member" });
  }
};

// Remove a member from a group
exports.removeMemberFromGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    group.members = group.members.filter(
      (member) => member.userId.toString() !== req.body.userId
    );
    await group.save();

    res.status(200).json(group);
  } catch (error) {
    console.error("Error removing member from group:", error);
    res.status(500).json({ error: "Failed to remove member" });
  }
};
