const express = require("express");
const connectionController = require("../Controller/ConnectionController");

const router = express.Router();

// Route to create a new connection (send a connection request)
router.post("/", connectionController.createConnection);

// Route to get a connection by ID
router.get("/:id", connectionController.getConnectionById);

// Route to get all connections for a user
router.get("/user/:userId", connectionController.getConnectionsByUser);

// Route to update a connection by ID (accept/reject/block)
router.put("/:id", connectionController.updateConnectionById);

// Route to delete a connection by ID (remove a connection)
router.delete("/:id", connectionController.deleteConnectionById);

module.exports = router;
