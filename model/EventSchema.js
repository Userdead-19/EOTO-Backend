const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  startDate: { type: Date, required: true },
  endDate: Date,
  location: String,
  groupId: { type: Schema.Types.ObjectId, ref: "Group" },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  reminders: [
    {
      message: String,
      date: { type: Date, default: Date.now },
    },
  ],
  attendees: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Event", eventSchema);
