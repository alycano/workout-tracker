import { plans } from "../data/plans.js";

// ---------- GET /v1/plans ----------
export const getPlans = (req, res) => {
  try {
    res.set("X-Total-Plans", plans.length.toString());
    return res.status(200).json(plans);
  } catch (err) {
    return res.status(500).json({ error: "Error al obtener planes" });
  }
};

// ---------- GET /v1/plans/:id ----------
export const getPlanById = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const plan = plans.find((p) => p.id === id);

    if (!plan) {
      return res.status(404).json({ error: "Plan no encontrado" });
    }

    return res.status(200).json(plan);
  } catch (err) {
    return res.status(500).json({ error: "Error al buscar plan" });
  }
};

// ---------- POST /v1/plans ----------
export const createPlan = (req, res) => {
  try {
    const { userId, name, exercises } = req.body;

    if (!userId || !name) {
      return res
        .status(400)
        .json({ error: "Los campos userId y name son obligatorios" });
    }

    const newPlan = {
      id: plans.length ? plans[plans.length - 1].id + 1 : 1,
      userId: Number(userId),
      name,
      exercises: exercises || [],
      createdAt: new Date().toISOString(),
    };

    plans.push(newPlan);

    res.set("X-Plan-Created", newPlan.id.toString());
    return res.status(201).json(newPlan);
  } catch (err) {
    return res.status(500).json({ error: "Error al crear plan" });
  }
};

// ---------- PUT /v1/plans/:id ----------
export const updatePlan = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = plans.findIndex((p) => p.id === id);

    if (index === -1) {
      return res.status(404).json({ error: "Plan no encontrado" });
    }

    const { userId, name, exercises } = req.body;

    if (!userId || !name) {
      return res
        .status(400)
        .json({ error: "Los campos userId y name son obligatorios en PUT" });
    }

    plans[index] = {
      id,
      userId: Number(userId),
      name,
      exercises: exercises || [],
      createdAt: plans[index].createdAt, // preservamos fecha de creación
      updatedAt: new Date().toISOString(),
    };

    return res.status(200).json(plans[index]);
  } catch (err) {
    return res.status(500).json({ error: "Error al actualizar plan" });
  }
};

// ---------- PATCH /v1/plans/:id ----------
export const patchPlan = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const plan = plans.find((p) => p.id === id);

    if (!plan) {
      return res.status(404).json({ error: "Plan no encontrado" });
    }

    Object.assign(plan, req.body, { updatedAt: new Date().toISOString() });

    return res.status(200).json(plan);
  } catch (err) {
    return res.status(500).json({ error: "Error al actualizar parcialmente plan" });
  }
};

// ---------- DELETE /v1/plans/:id ----------
export const deletePlan = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = plans.findIndex((p) => p.id === id);

    if (index === -1) {
      return res.status(404).json({ error: "Plan no encontrado" });
    }

    plans.splice(index, 1);
    return res.status(204).send(); // No Content
  } catch (err) {
    return res.status(500).json({ error: "Error al eliminar plan" });
  }
};