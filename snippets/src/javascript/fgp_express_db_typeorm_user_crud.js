const express = require("express");
const { DataSource, EntitySchema } = require("typeorm");

const app = express();
const PORT = 3000;

app.use(express.json());

/* =====================
   User Entity
===================== */
const UserEntity = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    name: {
      type: String,
      length: 150,
      nullable: false,
    },
    email: {
      type: String,
      length: 255,
      unique: true,
      nullable: false,
    },
    createdAt: {
      type: "timestamp",
      createDate: true,
    },
    updatedAt: {
      type: "timestamp",
      updateDate: true,
    },
  },
});

/* =====================
   DataSource
===================== */
const AppDataSource = new DataSource({
  type: "mariadb", // o "mysql"
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "my_database",
  entities: [UserEntity],
  synchronize: true, // true para crear tablas automáticamente
});

/* =====================
   Repository
===================== */
let userRepo;

/* =====================
   CRUD Endpoints
===================== */

/* CREATE */
app.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ message: "name and email are required" });

    const user = userRepo.create({ name, email });
    const saved = await userRepo.save(user);

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* READ ALL */
app.get("/users", async (_, res) => {
  try {
    const users = await userRepo.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* READ ONE */
app.get("/users/:id", async (req, res) => {
  try {
    const user = await userRepo.findOne({ where: { id: Number(req.params.id) } });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* UPDATE */
app.put("/users/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const user = await userRepo.findOne({ where: { id } });
    if (!user) return res.status(404).json({ message: "User not found" });

    userRepo.merge(user, req.body);
    const updated = await userRepo.save(user);

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* DELETE */
app.delete("/users/:id", async (req, res) => {
  try {
    const result = await userRepo.delete(Number(req.params.id));
    if (!result.affected) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =====================
   Init Server
===================== */
async function main() {
  try {
    await AppDataSource.initialize();
    console.log("Database connected");

    userRepo = AppDataSource.getRepository("User");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:3000`);
    });
  } catch (err) {
    console.error("Database connection failed", err);
  }
}

main();
