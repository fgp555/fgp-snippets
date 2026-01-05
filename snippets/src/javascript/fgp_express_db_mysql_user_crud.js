const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// MySQL Pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "my_database",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10
});

/*
|--------------------------------------------------------------------------
| CREATE - POST /users
|--------------------------------------------------------------------------
*/
app.post("/users", async (req, res) => {
  const { name, email } = req.body;

  try {
    const [result] = await pool.query(
      "INSERT INTO users (name, email) VALUES (?, ?)",
      [name, email]
    );

    res.status(201).json({
      id: result.insertId,
      name,
      email
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/*
|--------------------------------------------------------------------------
| READ ALL - GET /users
|--------------------------------------------------------------------------
*/
app.get("/users", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/*
|--------------------------------------------------------------------------
| READ ONE - GET /users/:id
|--------------------------------------------------------------------------
*/
app.get("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/*
|--------------------------------------------------------------------------
| UPDATE - PUT /users/:id
|--------------------------------------------------------------------------
*/
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const [result] = await pool.query(
      "UPDATE users SET name = ?, email = ? WHERE id = ?",
      [name, email, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ id, name, email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/*
|--------------------------------------------------------------------------
| DELETE - DELETE /users/:id
|--------------------------------------------------------------------------
*/
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      "DELETE FROM users WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`API running on http://localhost:\${PORT}`);
});
