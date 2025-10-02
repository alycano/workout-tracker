import express from "express";
import {
  getProgress,
  getProgressById,
  createProgress,
  updateProgress,
  patchProgress,
  deleteProgress
} from "../../controllers/progress.controller.js"; 

const router = express.Router();

// 🔹 Rutas Progress
router.get("/", getProgress);
router.get("/:id", getProgressById);
router.post("/", createProgress);
router.put("/:id", updateProgress);
router.patch("/:id", patchProgress); // parcial
router.delete("/:id", deleteProgress);

export default router;