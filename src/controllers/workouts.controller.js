import { workouts, getFilteredWorkouts } from "../data/workouts.js";

// ---------- GET /v1/workouts (con filtros) ----------
export const getWorkouts = (req, res) => {
  try {
    const { parte, limit } = req.query;
    const result = getFilteredWorkouts({ parte, limit });

    res.set("X-Total-Workouts", workouts.length.toString());
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: "Error al obtener workouts" });
  }
};

// ---------- GET /v1/workouts/:id ----------
export const getWorkoutById = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const workout = workouts.find((w) => w.id === id);

    if (!workout) {
      return res.status(404).json({ error: "Workout no encontrado" });
    }

    return res.status(200).json(workout);
  } catch (err) {
    return res.status(500).json({ error: "Error al buscar workout" });
  }
};

// ---------- POST /v1/workouts ----------
export const createWorkout = (req, res) => {
  try {
    const { titulo, parte, series, repeticiones } = req.body;

    if (!titulo || !parte || !series || !repeticiones) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const newWorkout = {
      id: workouts.length ? workouts[workouts.length - 1].id + 1 : 1,
      titulo,
      parte,
      series: Number(series),
      repeticiones: Number(repeticiones),
    };

    workouts.push(newWorkout);

    res.set("X-Workout-Created", newWorkout.id.toString());
    return res.status(201).json(newWorkout);
  } catch (err) {
    return res.status(500).json({ error: "Error al crear workout" });
  }
};

// ---------- PUT /v1/workouts/:id ----------
export const updateWorkout = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { titulo, parte, series, repeticiones } = req.body;

    const index = workouts.findIndex((w) => w.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Workout no encontrado" });
    }

    if (!titulo || !parte || !series || !repeticiones) {
      return res.status(400).json({ error: "Todos los campos son obligatorios en PUT" });
    }

    workouts[index] = {
      id,
      titulo,
      parte,
      series: Number(series),
      repeticiones: Number(repeticiones),
    };

    return res.status(200).json(workouts[index]);
  } catch (err) {
    return res.status(500).json({ error: "Error al actualizar workout" });
  }
};

// ---------- PATCH /v1/workouts/:id ----------
export const patchWorkout = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const workout = workouts.find((w) => w.id === id);

    if (!workout) {
      return res.status(404).json({ error: "Workout no encontrado" });
    }

    const { titulo, parte, series, repeticiones } = req.body;
    if (titulo !== undefined) workout.titulo = titulo;
    if (parte !== undefined) workout.parte = parte;
    if (series !== undefined) workout.series = Number(series);
    if (repeticiones !== undefined) workout.repeticiones = Number(repeticiones);

    return res.status(200).json(workout);
  } catch (err) {
    return res.status(500).json({ error: "Error al actualizar parcialmente workout" });
  }
};

// ---------- DELETE /v1/workouts/:id ----------
export const deleteWorkout = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = workouts.findIndex((w) => w.id === id);

    if (index === -1) {
      return res.status(404).json({ error: "Workout no encontrado" });
    }

    workouts.splice(index, 1);
    return res.status(204).send(); // No Content
  } catch (err) {
    return res.status(500).json({ error: "Error al eliminar workout" });
  }
};