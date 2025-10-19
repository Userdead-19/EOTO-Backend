import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectDB } from "./db.js"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import groupRoutes from "./routes/groups.js"
import taskRoutes from "./routes/tasks.js"
import gradeRoutes from "./routes/grades.js"
import calendarRoutes from "./routes/calendar.js"
import resourceRoutes from "./routes/resources.js"
import connectionRoutes from "./routes/connections.js"

dotenv.config()

connectDB()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:8080",
    credentials: true,
  }),
)
app.use(express.json())

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/groups", groupRoutes)
app.use("/api/tasks", taskRoutes)
app.use("/api/grades", gradeRoutes)
app.use("/api/calendar", calendarRoutes)
app.use("/api/resources", resourceRoutes)
app.use("/api/connections", connectionRoutes)

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "Backend is running" })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
