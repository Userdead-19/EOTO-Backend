import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Student", "Teacher", "Admin"],
      default: "Student",
      required: true,
    },
    year: {
      type: String,
      enum: ["1st Year", "2nd Year", "3rd Year", "4th Year", "Masters", "PhD"],
      default: "1st Year",
    },
    fieldOfStudy: {
      type: String,
      required: true,
    },
    termsAccepted: {
      type: Boolean,
      default: false,
    },
    bio: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
)

export default mongoose.model("User", userSchema)
