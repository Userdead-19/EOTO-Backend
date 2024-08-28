const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  profile: {
    firstName: String,
    lastName: String,
    bio: String,
    avatarUrl: String,
    academicInterests: [String],
    extracurricularInterests: [String],
    skills: [String],
    learningGoals: [String],
  },
  connections: [
    {
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      status: {
        type: String,
        enum: ["pending", "accepted", "blocked"],
        default: "pending",
      },
    },
  ],
  mentors: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdGroups: [{ type: Schema.Types.ObjectId, ref: "Group" }],
  joinedGroups: [{ type: Schema.Types.ObjectId, ref: "Group" }],
  gradeTracker: {
    grades: [
      {
        courseId: { type: Schema.Types.ObjectId, ref: "Course" },
        grade: String,
        date: { type: Date, default: Date.now },
      },
    ],
    academicGoals: [String],
    reminders: [
      {
        message: String,
        date: { type: Date, default: Date.now },
      },
    ],
  },
  taskSheet: [
    {
      taskId: { type: Schema.Types.ObjectId, ref: "Task" },
      title: String,
      description: String,
      priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "low",
      },
      dueDate: Date,
      status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending",
      },
      completedDate: Date,
      analysis: String,
    },
  ],
  calendar: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  newsletterSubscriptions: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
