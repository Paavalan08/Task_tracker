const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
app.get("/", (req, res) => {
  res.send("Task Tracker API is running...");
});
const taskRoutes = require("./routes/tasks");
app.use("/api", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

