import express from "express"
import { verifyToken } from "../middleware/auth.js"
import Grade from "../models/Grade.js"

const router = express.Router()

// Add grade
router.post("/", verifyToken, async (req, res) => {
  try {
    const { subject, assignment, score, maxScore, date } = req.body

    if (!subject || !assignment || score === undefined) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    const percentage = ((score / (maxScore || 100)) * 100).toFixed(2)

    const newGrade = new Grade({
      userId: req.userId,
      subject,
      assignment,
      score,
      maxScore: maxScore || 100,
      percentage,
      date: date || new Date(),
    })

    await newGrade.save()

    res.status(201).json(newGrade)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get user's grades
router.get("/", verifyToken, async (req, res) => {
  try {
    const grades = await Grade.find({ userId: req.userId })
    res.json(grades)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get grades by subject
router.get("/subject/:subject", verifyToken, async (req, res) => {
  try {
    const grades = await Grade.find({ userId: req.userId, subject: req.params.subject })
    res.json(grades)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
