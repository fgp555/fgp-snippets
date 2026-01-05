const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
app.use(express.json());

// MongoDB configuration
const MONGO_URI = "mongodb://127.0.0.1:27017";
const DB_NAME = "my_database";
const COLLECTION_NAME = "users";

const client = new MongoClient(MONGO_URI);

let db;
let usersCollection;

// Connect to MongoDB (once)
async function connectDB() {
  await client.connect();
  db = client.db(DB_NAME);
  usersCollection = db.collection(COLLECTION_NAME);
  console.log("MongoDB connected");
}

// CREATE
app.post("/users", async (req, res) => {
  try {
    const result = await usersCollection.insertOne({
      ...req.body,
      createdAt: new Date(),
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ ALL
app.get("/users", async (req, res) => {
  try {
    const users = await usersCollection.find().toArray();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ ONE
app.get("/users/:id", async (req, res) => {
  try {
    const user = await usersCollection.findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({ error: "Invalid ID" });
  }
});

// UPDATE
app.put("/users/:id", async (req, res) => {
  try {
    const result = await usersCollection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { \$set: req.body }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ updated: result.modifiedCount });
  } catch (error) {
    res.status(400).json({ error: "Invalid ID" });
  }
});

// DELETE
app.delete("/users/:id", async (req, res) => {
  try {
    const result = await usersCollection.deleteOne({
      _id: new ObjectId(req.params.id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ deleted: true });
  } catch (error) {
    res.status(400).json({ error: "Invalid ID" });
  }
});

// Start server
const PORT = 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API running at http://localhost:\${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
