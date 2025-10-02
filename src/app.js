import express from "express";
import { port } from "./config/env.js";

// 🔹 Importamos el router centralizado de rutas versionadas
import apiRoutes from "./routes/index.js";

const app = express();

// ---------- MIDDLEWARES BÁSICOS ----------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------- CONFIGURACIÓN DE API KEY ----------
const API_KEY = process.env.API_KEY || "Cano1208";

app.use((req, res, next) => {
  const apiKey = req.get("X-API-Key");
  // Si quieres obligatoria, descomenta la siguiente línea:
  // if (!apiKey) return res.status(401).json({ error: "Falta API Key" });
  if (apiKey && apiKey !== API_KEY) {
    return res.status(401).json({ error: "API Key inválida" });
  }
  next();
});

// Middleware opcional de debug de cabeceras
app.use((req, res, next) => {
  console.log("Cabeceras recibidas:", req.headers);
  next();
});

// ---------- RUTA BASE ----------
app.get("/", (req, res) => {
  res.set({
    "X-Powered-By": "Express",
    "X-Server-Info": "Workout Tracker API",
  });
  res.status(200).json({
    message: "Workout Tracker API",
    versions: ["v1"],
    endpoints: {
      v1: "/api/v1",
    },
  });
});

// ---------- RUTAS PRINCIPALES (VERSIONADAS) ----------
app.use("/api", apiRoutes);

// ---------- INICIO DEL SERVIDOR ----------
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});