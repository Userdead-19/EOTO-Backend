const express = require("express");
const userController = require("../Controller/UserController");

const router = express.Router();

// Route to create a new user
router.post("/", userController.createUser);

// Route to get a user by ID
router.get("/:id", userController.getUserById);

// Route to get all users
router.get("/", userController.getAllUsers);

// Route to update a user by ID
router.put("/:id", userController.updateUserById);

// Route to delete a user by ID
router.delete("/:id", userController.deleteUserById);

// Route to find users by interest
router.get("/interest/:interest", userController.findUsersByInterest);

module.exports = router;
