import { apiKey } from "../config/env.js";

export function validateApiKey(req, res, next) {
  // Leer cabecera personalizada
  const clientKey = req.get("X-API-Key");

  // Validar la API Key
  if (!clientKey || clientKey !== apiKey) {
    return res.status(401).json({ error: "API Key inválida o ausente" });
  }

  // Si todo OK, seguir
  next();
}