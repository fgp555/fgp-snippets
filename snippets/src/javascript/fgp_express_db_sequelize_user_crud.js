const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");

// =====================
// Database configuration
// =====================
const DB_NAME = process.env.DB_NAME || "my_database";
const DB_USER = process.env.DB_USER || "root";
const DB_PASS = process.env.DB_PASS || "";
const DB_HOST = process.env.DB_HOST || "localhost";

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: "mysql", // change to "postgres" if needed
  logging: false,
});

// =====================
// Define User model
// =====================
const User = sequelize.define(
  "User",
  {
    // id: {
    //   type: DataTypes.INTEGER,
    //   autoIncrement: true,
    //   primaryKey: true,
    // },
    // id: {
    //   type: DataTypes.UUID, // UUID type
    //   defaultValue: DataTypes.UUIDV4, // generates a new UUID v4 automatically
    //   primaryKey: true,
    // },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "users",
    timestamps: true, // adds createdAt and updatedAt
  }
);

// =====================
// Initialize Express
// =====================
const app = express();
const PORT = 3000;
app.use(express.json());

// =====================
// Logging middleware
// =====================
app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const elapsed = Date.now() - start;
    console.log(`\${req.method} \${req.originalUrl} \${res.statusCode} - \${elapsed}ms`);
  });

  next();
});

// =====================
// Sync database
// =====================
async function initDB() {
  try {
    await sequelize.authenticate();
    console.log("Database connected");

    await sequelize.sync({ force: true }); // ⚡ drops tables if they exist and recreates them
    console.log("Tables dropped and recreated");
  } catch (err) {
    console.error("Database connection error:", err);
  }
}

// =====================
// CRUD Endpoints
// =====================

// CREATE
app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ message: "Name and email are required" });

  try {
    const user = await User.create({ name, email });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ALL
app.get("/users", async (_, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ONE
app.get("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name;
    user.email = email;
    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.destroy();
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =====================
// Start server
// =====================
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`API running on http://localhost:\${PORT}`);
  });
});
