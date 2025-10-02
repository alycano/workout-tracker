import { progress } from "../data/progress.js";

// 🔹 GET /progress (lista todos los registros)
export const getProgress = (req, res) => {
  res.set("X-Total-Progress", progress.length.toString());
  res.status(200).json(progress);
};

// 🔹 GET /progress/:id (registro individual)
export const getProgressById = (req, res) => {
  const id = parseInt(req.params.id);
  const record = progress.find(p => p.id === id);

  if (!record) {
    return res.status(404).json({ error: "Registro de progreso no encontrado" });
  }

  res.status(200).json(record);
};

// 🔹 POST /progress (crear nuevo registro)
export const createProgress = (req, res) => {
  const { userId, workoutId, date, notes, performance } = req.body;

  if (!userId || !workoutId || !date || !performance) {
    return res.status(400).json({
      error: "Faltan campos obligatorios (userId, workoutId, date, performance)",
    });
  }

  const newProgress = {
    id: progress.length ? progress[progress.length - 1].id + 1 : 1,
    userId: Number(userId),
    workoutId: Number(workoutId),
    date,
    notes: notes ?? "",
    performance,
  };

  progress.push(newProgress);

  res.set("X-Progress-Created", newProgress.id.toString());
  res.status(201).json(newProgress);
};

// 🔹 PUT /progress/:id (actualización completa)
export const updateProgress = (req, res) => {
  const id = parseInt(req.params.id);
  const index = progress.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Registro de progreso no encontrado" });
  }

  const { userId, workoutId, date, notes, performance } = req.body;

  if (!userId || !workoutId || !date || !performance) {
    return res.status(400).json({
      error: "Todos los campos son obligatorios en PUT (userId, workoutId, date, performance)",
    });
  }

  progress[index] = {
    id,
    userId: Number(userId),
    workoutId: Number(workoutId),
    date,
    notes: notes ?? "",
    performance,
  };

  res.status(200).json(progress[index]);
};

// 🔹 PATCH /progress/:id (actualización parcial)
export const patchProgress = (req, res) => {
  const id = parseInt(req.params.id);
  const record = progress.find(p => p.id === id);

  if (!record) {
    return res.status(404).json({ error: "Registro de progreso no encontrado" });
  }

  // Solo actualiza los campos enviados
  if (req.body.userId) record.userId = Number(req.body.userId);
  if (req.body.workoutId) record.workoutId = Number(req.body.workoutId);
  if (req.body.date) record.date = req.body.date;
  if (req.body.notes !== undefined) record.notes = req.body.notes;
  if (req.body.performance) record.performance = req.body.performance;

  res.status(200).json(record);
};

// 🔹 DELETE /progress/:id
export const deleteProgress = (req, res) => {
  const id = parseInt(req.params.id);
  const index = progress.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Registro de progreso no encontrado" });
  }

  progress.splice(index, 1);

  res.set("X-Progress-Deleted", id.toString());
  res.status(204).send(); // 204 No Content
};