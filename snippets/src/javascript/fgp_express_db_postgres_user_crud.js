const express = require("express");
const { Pool } = require("pg");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// PostgreSQL Pool
const pool = new Pool({
  host: "localhost",
  user: "postgres",      // cambia según tu usuario
  password: "admin",  // cambia según tu contraseña
  database: "postgres",
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});

/*
| CREATE - POST /users
*/
app.post("/users", async (req, res) => {
  const { name, email } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id",
      [name, email]
    );

    res.status(201).json({
      id: result.rows[0].id,
      name,
      email
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/*
| READ ALL - GET /users
*/
app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/*
| READ ONE - GET /users/:id
*/
app.get("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/*
| UPDATE - PUT /users/:id
*/
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const result = await pool.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
      [name, email, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/*
| DELETE - DELETE /users/:id
*/
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
