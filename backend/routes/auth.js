import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.js"
import { JWT_SECRET } from "../middleware/auth.js"

const router = express.Router()

// Register
router.post("/register", async (req, res) => {
  try {
    const { email, password, fullName, role, year, fieldOfStudy, termsAccepted } = req.body

    if (!email || !password || !fullName || !role || !fieldOfStudy || !termsAccepted) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    if (!termsAccepted) {
      return res.status(400).json({ error: "You must accept the Terms of Service" })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      email,
      password: hashedPassword,
      fullName,
      role,
      year: year || "1st Year",
      fieldOfStudy,
      termsAccepted,
    })

    await newUser.save()

    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: "7d" })

    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
        fullName: newUser.fullName,
        role: newUser.role,
        year: newUser.year,
        fieldOfStudy: newUser.fieldOfStudy,
      },
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" })

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        year: user.year,
        fieldOfStudy: user.fieldOfStudy,
      },
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
