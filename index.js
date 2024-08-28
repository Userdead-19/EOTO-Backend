const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/users", require("./router/UserRouter"));
app.use("/api/groups", require("./router/groupRouter"));
app.use("/api/connections", require("./router/ConnectionRouter"));
app.use("/api/events", require("./router/EventRouter"));
app.use("/api/newsLetter", require("./router/newsLetterRouter"));

app.listen(process.env.EXPRESS_PORT, () => {
  console.log("Server is running on port " + process.env.EXPRESS_PORT);
});
