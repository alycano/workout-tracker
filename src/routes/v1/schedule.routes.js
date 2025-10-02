import express from "express";
import {
  getSchedule,
  getScheduleById,
  createSchedule,
  updateSchedule,
  patchSchedule,
  deleteSchedule
} from "../../controllers/schedule.controller.js";

const router = express.Router();

router.get("/", getSchedule);
router.get("/:id", getScheduleById);
router.post("/", createSchedule);
router.put("/:id", updateSchedule);
router.patch("/:id", patchSchedule);
router.delete("/:id", deleteSchedule);

export default router;