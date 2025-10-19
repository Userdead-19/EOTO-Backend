import express from "express"
import { verifyToken } from "../middleware/auth.js"
import Calendar from "../models/Calendar.js"

const router = express.Router()

// Create event
router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, description, startDate, endDate, type } = req.body

    if (!title || !startDate) {
      return res.status(400).json({ error: "Title and start date required" })
    }

    const newEvent = new Calendar({
      userId: req.userId,
      title,
      description: description || "",
      startDate,
      endDate: endDate || startDate,
      type: type || "event",
    })

    await newEvent.save()

    res.status(201).json(newEvent)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get user's events
router.get("/", verifyToken, async (req, res) => {
  try {
    const events = await Calendar.find({ userId: req.userId })
    res.json(events)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update event
router.put("/:eventId", verifyToken, async (req, res) => {
  try {
    const { title, description, startDate, endDate, type } = req.body
    const event = await Calendar.findByIdAndUpdate(
      req.params.eventId,
      {
        title,
        description,
        startDate,
        endDate,
        type,
      },
      { new: true },
    )

    if (!event) {
      return res.status(404).json({ error: "Event not found" })
    }

    res.json(event)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Delete event
router.delete("/:eventId", verifyToken, async (req, res) => {
  try {
    await Calendar.findByIdAndDelete(req.params.eventId)
    res.json({ message: "Event deleted" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
