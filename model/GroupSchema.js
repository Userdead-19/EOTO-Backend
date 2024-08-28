const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  groupName: { type: String, required: true },
  description: String,
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  members: [
    {
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      role: {
        type: String,
        enum: ["moderator", "contributor", "member"],
        default: "member",
      },
    },
  ],
  resources: [
    {
      resourceId: { type: Schema.Types.ObjectId },
      title: String,
      url: String,
      type: { type: String, enum: ["pdf", "video", "note"], default: "note" },
    },
  ],
  tasks: [
    {
      taskId: { type: Schema.Types.ObjectId, ref: "Task" },
      title: String,
      description: String,
      assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
      dueDate: Date,
      status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending",
      },
    },
  ],
  discussions: [
    {
      discussionId: { type: Schema.Types.ObjectId },
      title: String,
      content: String,
      postedBy: { type: Schema.Types.ObjectId, ref: "User" },
      comments: [
        {
          commentId: { type: Schema.Types.ObjectId },
          content: String,
          postedBy: { type: Schema.Types.ObjectId, ref: "User" },
          createdAt: { type: Date, default: Date.now },
        },
      ],
      createdAt: { type: Date, default: Date.now },
    },
  ],
  calendarEvents: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Group", groupSchema);
