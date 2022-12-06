import express from "express";
import pkg from "pg";

const { Pool } = pkg;

const connection = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "root",
  database: "tastecamp",
});

const app = express();

app.get("/receitas", async (req, res) => {
  const receitas = await connection.query("SELECT * FROM receitas;");
  res.send(receitas.rows);
});



const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running in port ${port}`));
