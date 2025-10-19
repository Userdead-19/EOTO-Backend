import express from "express"
import { verifyToken } from "../middleware/auth.js"
import User from "../models/User.js"

const router = express.Router()

// Get user profile
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password")

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    res.json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update user profile
router.put("/profile", verifyToken, async (req, res) => {
  try {
    const { bio, avatar, major, year } = req.body
    const user = await User.findByIdAndUpdate(req.userId, { bio, avatar, major, year }, { new: true }).select(
      "-password",
    )

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    res.json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get user by ID
router.get("/:userId", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password")

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    res.json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
