const express = require("express");
const groupController = require("../Controller/GroupController");

const router = express.Router();

// Route to create a new group
router.post("/", groupController.createGroup);

// Route to get a group by ID
router.get("/:id", groupController.getGroupById);

// Route to get all groups
router.get("/", groupController.getAllGroups);

// Route to update a group by ID
router.put("/:id", groupController.updateGroupById);

// Route to delete a group by ID
router.delete("/:id", groupController.deleteGroupById);

// Route to add a member to a group
router.post("/:id/add-member", groupController.addMemberToGroup);

// Route to remove a member from a group
router.post("/:id/remove-member", groupController.removeMemberFromGroup);

module.exports = router;
