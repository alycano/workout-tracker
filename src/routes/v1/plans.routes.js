import express from "express";
import {
  getWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout,
  patchWorkout // si tienes PATCH
} from "../../controllers/workouts.controller.js"; // ← sube dos niveles

const router = express.Router();

// ---------- RUTAS WORKOUTS ----------
router.get("/", getWorkouts);
router.get("/:id", getWorkoutById);
router.post("/", createWorkout);
router.put("/:id", updateWorkout);
router.patch("/:id", patchWorkout); // opcional si existe
router.delete("/:id", deleteWorkout);

export default router;