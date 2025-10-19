import express from "express"
import { verifyToken } from "../middleware/auth.js"
import Connection from "../models/Connection.js"

const router = express.Router()

// Send connection request
router.post("/request", verifyToken, async (req, res) => {
  try {
    const { targetUserId } = req.body

    if (!targetUserId) {
      return res.status(400).json({ error: "Target user ID required" })
    }

    const existingRequest = await Connection.findOne({
      fromUserId: req.userId,
      toUserId: targetUserId,
    })

    if (existingRequest) {
      return res.status(400).json({ error: "Request already sent" })
    }

    const newRequest = new Connection({
      fromUserId: req.userId,
      toUserId: targetUserId,
      status: "pending",
    })

    await newRequest.save()

    res.status(201).json(newRequest)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Accept connection request
router.post("/:connectionId/accept", verifyToken, async (req, res) => {
  try {
    const connection = await Connection.findByIdAndUpdate(
      req.params.connectionId,
      { status: "accepted" },
      { new: true },
    )

    if (!connection) {
      return res.status(404).json({ error: "Connection not found" })
    }

    res.json(connection)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get user's connections
router.get("/", verifyToken, async (req, res) => {
  try {
    const connections = await Connection.find({
      $or: [{ fromUserId: req.userId }, { toUserId: req.userId }],
      status: "accepted",
    }).populate("fromUserId toUserId", "-password")

    res.json(connections)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get pending requests
router.get("/pending", verifyToken, async (req, res) => {
  try {
    const pendingRequests = await Connection.find({
      toUserId: req.userId,
      status: "pending",
    }).populate("fromUserId", "-password")

    res.json(pendingRequests)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
