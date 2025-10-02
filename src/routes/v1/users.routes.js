import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  patchUser,   // ← Nuevo para actualizaciones parciales
  deleteUser
} from "../../controllers/users.controller.js";

const router = express.Router();

// ---------- RUTAS USERS ----------
router.get("/", getUsers);          // GET /api/v1/users
router.get("/:id", getUserById);    // GET /api/v1/users/:id
router.post("/", createUser);       // POST /api/v1/users
router.put("/:id", updateUser);     // PUT /api/v1/users/:id
router.patch("/:id", patchUser);    // PATCH /api/v1/users/:id (parcial)
router.delete("/:id", deleteUser);  // DELETE /api/v1/users/:id

export default router;