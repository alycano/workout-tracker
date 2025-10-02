import express from "express";
import usersRoutes from "./users.routes.js";
import workoutsRoutes from "./workouts.routes.js";
import plansRoutes from "./plans.routes.js";
import progressRoutes from "./progress.routes.js";
import scheduleRoutes from "./schedule.routes.js";

const router = express.Router();

// Monta rutas específicas con prefijo
router.use("/users", usersRoutes);
router.use("/workouts", workoutsRoutes);
router.use("/plans", plansRoutes);
router.use("/progress", progressRoutes);
router.use("/schedule", scheduleRoutes);

export default router;