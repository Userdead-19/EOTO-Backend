const Connection = require("../model/ConnectionSchema");

// Create a new connection (send a connection request)
exports.createConnection = async (req, res) => {
  try {
    const connection = new Connection(req.body);
    const savedConnection = await connection.save();
    res.status(201).json(savedConnection);
  } catch (error) {
    console.error("Error creating connection:", error);
    res.status(500).json({ error: "Failed to create connection" });
  }
};

// Get a connection by ID
exports.getConnectionById = async (req, res) => {
  try {
    const connection = await Connection.findById(req.params.id).populate(
      "fromUserId toUserId"
    );
    if (!connection) {
      return res.status(404).json({ error: "Connection not found" });
    }
    res.status(200).json(connection);
  } catch (error) {
    console.error("Error retrieving connection:", error);
    res.status(500).json({ error: "Failed to retrieve connection" });
  }
};

// Get all connections for a user
exports.getConnectionsByUser = async (req, res) => {
  try {
    const connections = await Connection.find({
      $or: [{ fromUserId: req.params.userId }, { toUserId: req.params.userId }],
    }).populate("fromUserId toUserId");
    res.status(200).json(connections);
  } catch (error) {
    console.error("Error retrieving connections:", error);
    res.status(500).json({ error: "Failed to retrieve connections" });
  }
};

// Update a connection by ID (accept/reject/block)
exports.updateConnectionById = async (req, res) => {
  try {
    const updatedConnection = await Connection.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).populate("fromUserId toUserId");
    if (!updatedConnection) {
      return res.status(404).json({ error: "Connection not found" });
    }
    res.status(200).json(updatedConnection);
  } catch (error) {
    console.error("Error updating connection:", error);
    res.status(500).json({ error: "Failed to update connection" });
  }
};

// Delete a connection by ID (remove a connection)
exports.deleteConnectionById = async (req, res) => {
  try {
    const deletedConnection = await Connection.findByIdAndDelete(req.params.id);
    if (!deletedConnection) {
      return res.status(404).json({ error: "Connection not found" });
    }
    res.status(200).json({ message: "Connection deleted successfully" });
  } catch (error) {
    console.error("Error deleting connection:", error);
    res.status(500).json({ error: "Failed to delete connection" });
  }
};
