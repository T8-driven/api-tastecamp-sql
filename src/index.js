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
app.use(express.json());

app.get("/receitas", async (req, res) => {
  const receitas = await connection.query("SELECT * FROM receitas;");
  res.send(receitas.rows);
});

app.get("/receitas/:id", async (req, res) => {
  const { id } = req.params;
  const receita = await connection.query("SELECT * FROM receitas WHERE id=$1", [
    id,
  ]);
  res.send(receita.rows[0]);
});

app.post("/receitas", async (req, res) => {
  const { titulo, ingredientes, preparo } = req.body;

  await connection.query(
    "INSERT INTO receitas (titulo, ingredientes, preparo) VALUES ($1, $2, $3)",
    [titulo, ingredientes, preparo]
  );

  res.send(201);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running in port ${port}`));
