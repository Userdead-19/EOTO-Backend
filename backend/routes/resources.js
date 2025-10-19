import express from "express"
import { verifyToken } from "../middleware/auth.js"
import Resource from "../models/Resource.js"

const router = express.Router()

// Create resource
router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, description, url, type, groupId } = req.body

    if (!title || !url) {
      return res.status(400).json({ error: "Title and URL required" })
    }

    const newResource = new Resource({
      title,
      description: description || "",
      url,
      type: type || "link",
      groupId: groupId || null,
      createdBy: req.userId,
    })

    await newResource.save()
    await newResource.populate("createdBy", "-password")

    res.status(201).json(newResource)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get all resources
router.get("/", verifyToken, async (req, res) => {
  try {
    const resources = await Resource.find().populate("createdBy", "-password")
    res.json(resources)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get group resources
router.get("/group/:groupId", verifyToken, async (req, res) => {
  try {
    const resources = await Resource.find({ groupId: req.params.groupId }).populate("createdBy", "-password")
    res.json(resources)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
