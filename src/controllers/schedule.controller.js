import { schedule } from "../data/schedule.js";

// 🔹 GET /schedule (lista completa)
export const getSchedule = (req, res) => {
  res.set("X-Total-Schedule", schedule.length.toString());
  res.status(200).json(schedule);
};

// 🔹 GET /schedule/:id (registro individual)
export const getScheduleById = (req, res) => {
  const id = parseInt(req.params.id);
  const item = schedule.find(s => s.id === id);

  if (!item) {
    return res.status(404).json({ error: "Programación no encontrada" });
  }

  res.status(200).json(item);
};

// 🔹 POST /schedule (crear nueva programación)
export const createSchedule = (req, res) => {
  const { userId, workoutId, date, time, status } = req.body;

  if (!userId || !workoutId || !date || !time || !status) {
    return res.status(400).json({
      error: "Faltan campos obligatorios (userId, workoutId, date, time, status)",
    });
  }

  const newSchedule = {
    id: schedule.length ? schedule[schedule.length - 1].id + 1 : 1,
    userId: Number(userId),
    workoutId: Number(workoutId),
    date,
    time,
    status,
  };

  schedule.push(newSchedule);

  res.set("X-Schedule-Created", newSchedule.id.toString());
  res.status(201).json(newSchedule);
};

// 🔹 PUT /schedule/:id (actualización completa)
export const updateSchedule = (req, res) => {
  const id = parseInt(req.params.id);
  const index = schedule.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Programación no encontrada" });
  }

  const { userId, workoutId, date, time, status } = req.body;

  if (!userId || !workoutId || !date || !time || !status) {
    return res.status(400).json({
      error: "Todos los campos son obligatorios en PUT (userId, workoutId, date, time, status)",
    });
  }

  schedule[index] = {
    id,
    userId: Number(userId),
    workoutId: Number(workoutId),
    date,
    time,
    status,
  };

  res.status(200).json(schedule[index]);
};

// 🔹 PATCH /schedule/:id (actualización parcial)
export const patchSchedule = (req, res) => {
  const id = parseInt(req.params.id);
  const item = schedule.find(s => s.id === id);

  if (!item) {
    return res.status(404).json({ error: "Programación no encontrada" });
  }

  // Actualizar solo lo enviado
  if (req.body.userId) item.userId = Number(req.body.userId);
  if (req.body.workoutId) item.workoutId = Number(req.body.workoutId);
  if (req.body.date) item.date = req.body.date;
  if (req.body.time) item.time = req.body.time;
  if (req.body.status) item.status = req.body.status;

  res.status(200).json(item);
};

// 🔹 DELETE /schedule/:id
export const deleteSchedule = (req, res) => {
  const id = parseInt(req.params.id);
  const index = schedule.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Programación no encontrada" });
  }

  schedule.splice(index, 1);

  res.set("X-Schedule-Deleted", id.toString());
  res.status(204).send(); // 204 No Content
};