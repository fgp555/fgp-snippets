const mysql = require("mysql2/promise");

async function queriesUsers() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "my_database",
  });

  const result = await connection.query("SELECT * FROM users");

  //   const result = await connection.query("SELECT * FROM users WHERE id = 1");

  //   const result = await connection.query(
  //     "INSERT INTO users (name, email) VALUES (?, ?)",
  //     ["userCreate", "email@gmail.com"] //
  //   );

  //   const result = await connection.query(
  //     "UPDATE users SET name = ?, email = ? WHERE id = ?",
  //     ["UserUpdate", "email.update@gmail.com", 1] //
  //   );

  //   const result = await connection.query("DELETE FROM users WHERE id = ?", [5]);

  console.log(result);

  await connection.end();
}

queriesUsers().catch(console.error);
