import express from "express";
import {
  getWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  // Si no tienes patchWorkout implementado en el controller, quita esta línea y la ruta .patch()
  // patchWorkout,
  deleteWorkout,
} from "../../controllers/workouts.controller.js";

// 1️ Crear router
const router = express.Router();

// 2️Definir rutas
router.get("/", getWorkouts);
router.get("/:id", getWorkoutById);
router.post("/", createWorkout);
router.put("/:id", updateWorkout);

//  Si no tienes patchWorkout, comenta esta línea
// router.patch("/:id", patchWorkout);

router.delete("/:id", deleteWorkout);

// 3️ Exportar router
export default router;