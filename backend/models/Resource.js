import mongoose from "mongoose"

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    url: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["link", "document", "video", "other"],
      default: "link",
    },
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      default: null,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
)

export default mongoose.model("Resource", resourceSchema)
