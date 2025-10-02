// routes/index.js
import express from "express";
import v1Routes from "./v1/index.js";

const router = express.Router();

// 👋 Ruta base de /api con saludo
router.get("/", (req, res) => {
  res.send("Bienvenido a Total SelfCare API ");
});

// Versionado
router.use("/v1", v1Routes);

export default router;