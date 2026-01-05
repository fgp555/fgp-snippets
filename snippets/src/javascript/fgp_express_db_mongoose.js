const express = require("express");
const mongoose = require("mongoose");

/* =========================
   Configuration
========================= */

const PORT = 3000;
const MONGO_URI = "mongodb://127.0.0.1:27017/my_database";

/* =========================
   Database Connection
========================= */

async function connectDB() {
  await mongoose.connect(MONGO_URI);
  console.log("MongoDB connected");
}

/* =========================
   Model
========================= */

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

/* =========================
   App Setup
========================= */

const app = express();
app.use(express.json());

/* =========================
   CRUD Routes
========================= */

// CREATE
app.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// READ ONE
app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch {
    res.status(400).json({ message: "Invalid ID" });
  }
});

// UPDATE
app.put("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
app.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch {
    res.status(400).json({ message: "Invalid ID" });
  }
});

/* =========================
   Start Server
========================= */

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:\${PORT}`);
  });
}

start();
