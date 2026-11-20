import express, { Request, Response } from "express";
import { pool } from "./db";

const app = express();
const PORT = Number(process.env.PORT) || 4000;

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("Hola");
});

// Comprueba que el backend se conecta a PostgreSQL
app.get("/db-test", async (_req: Request, res: Response) => {
  try {
    const r = await pool.query("SELECT NOW() AS ahora");
    res.json({ conectado: true, hora: r.rows[0].ahora });
  } catch (error) {
    console.error(error);
    res.status(500).json({ conectado: false, error: "No se pudo conectar a la base de datos" });
  }
});

// Devuelve los activos de la tabla
app.get("/activos", async (_req: Request, res: Response) => {
  try {
    const r = await pool.query("SELECT * FROM activos ORDER BY id");
    res.json(r.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudieron consultar los activos" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});