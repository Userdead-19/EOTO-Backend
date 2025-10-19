import express from "express"
import { verifyToken } from "../middleware/auth.js"
import Task from "../models/Task.js"

const router = express.Router()

// Create task
router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, description, dueDate, groupId, priority } = req.body

    if (!title) {
      return res.status(400).json({ error: "Task title required" })
    }

    const newTask = new Task({
      title,
      description: description || "",
      dueDate: dueDate || null,
      groupId: groupId || null,
      createdBy: req.userId,
      assignedTo: [req.userId],
      priority: priority || "medium",
    })

    await newTask.save()
    await newTask.populate("createdBy assignedTo groupId", "-password")

    res.status(201).json(newTask)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get user's tasks
router.get("/", verifyToken, async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.userId }).populate("createdBy assignedTo groupId", "-password")
    res.json(tasks)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update task
router.put("/:taskId", verifyToken, async (req, res) => {
  try {
    const { title, description, dueDate, completed, priority } = req.body
    const task = await Task.findByIdAndUpdate(
      req.params.taskId,
      {
        title,
        description,
        dueDate,
        completed,
        priority,
      },
      { new: true },
    ).populate("createdBy assignedTo groupId", "-password")

    if (!task) {
      return res.status(404).json({ error: "Task not found" })
    }

    res.json(task)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Delete task
router.delete("/:taskId", verifyToken, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.taskId)
    res.json({ message: "Task deleted" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
