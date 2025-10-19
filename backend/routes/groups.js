import express from "express"
import { verifyToken } from "../middleware/auth.js"
import Group from "../models/Group.js"

const router = express.Router()

// Create group
router.post("/", verifyToken, async (req, res) => {
  try {
    const { name, description, subject } = req.body

    if (!name) {
      return res.status(400).json({ error: "Group name required" })
    }

    const newGroup = new Group({
      name,
      description: description || "",
      subject: subject || "",
      createdBy: req.userId,
      members: [req.userId],
    })

    await newGroup.save()
    await newGroup.populate("createdBy members", "-password")

    res.status(201).json(newGroup)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get all groups
router.get("/", verifyToken, async (req, res) => {
  try {
    const groups = await Group.find().populate("createdBy members", "-password")
    res.json(groups)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get group by ID
router.get("/:groupId", verifyToken, async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId).populate("createdBy members", "-password")

    if (!group) {
      return res.status(404).json({ error: "Group not found" })
    }

    res.json(group)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Join group
router.post("/:groupId/join", verifyToken, async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId)

    if (!group) {
      return res.status(404).json({ error: "Group not found" })
    }

    if (!group.members.includes(req.userId)) {
      group.members.push(req.userId)
      await group.save()
    }

    await group.populate("createdBy members", "-password")
    res.json(group)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Leave group
router.post("/:groupId/leave", verifyToken, async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId)

    if (!group) {
      return res.status(404).json({ error: "Group not found" })
    }

    group.members = group.members.filter((m) => m.toString() !== req.userId)
    await group.save()

    await group.populate("createdBy members", "-password")
    res.json(group)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
