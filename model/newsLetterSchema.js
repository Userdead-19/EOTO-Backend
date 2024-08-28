const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newsletterSchema = new Schema({
  title: { type: String, required: true },
  content: String,
  multimedia: [
    {
      type: { type: String, enum: ["image", "video"] },
      url: String,
    },
  ],
  sentTo: [{ type: Schema.Types.ObjectId, ref: "User" }],
  sentBy: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Newsletter", newsletterSchema);
