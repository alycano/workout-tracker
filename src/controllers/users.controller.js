import { users } from "../data/users.js";

// ---------- GET /v1/users ----------
export const getUsers = (req, res) => {
  try {
    const { role, search } = req.query;
    let result = users;

    if (role) {
      result = result.filter(u => u.role === role);
    }

    if (search) {
      result = result.filter(u =>
        u.nombre.toLowerCase().includes(search.toLowerCase())
      );
    }

    res.set("X-Total-Users", result.length.toString());
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

// ---------- GET /v1/users/:id ----------
export const getUserById = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

    const user = users.find(u => u.id === id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ error: "Error al buscar usuario" });
  }
};

// ---------- POST /v1/users ----------
export const createUser = (req, res) => {
  try {
    const { nombre, email } = req.body;

    if (!nombre || !email) {
      return res
        .status(400)
        .json({ error: "Los campos nombre y email son obligatorios" });
    }

    const emailExists = users.some(u => u.email === email);
    if (emailExists) {
      return res.status(409).json({ error: "El email ya está registrado" });
    }

    const newUser = {
      id: users.length ? users[users.length - 1].id + 1 : 1,
      nombre,
      email,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);

    res.set("X-User-Created", newUser.id.toString());
    return res.status(201).json(newUser);
  } catch (err) {
    return res.status(500).json({ error: "Error al crear usuario" });
  }
};

// ---------- PUT /v1/users/:id ----------
export const updateUser = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

    const { nombre, email } = req.body;
    if (!nombre || !email) {
      return res
        .status(400)
        .json({ error: "Los campos nombre y email son obligatorios" });
    }

    const index = users.findIndex(u => u.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Validar duplicado si se cambia el email
    const emailExists = users.some(u => u.email === email && u.id !== id);
    if (emailExists) {
      return res.status(409).json({ error: "El email ya está registrado por otro usuario" });
    }

    users[index] = {
      ...users[index],
      nombre,
      email,
    };

    return res.status(200).json(users[index]);
  } catch (err) {
    return res.status(500).json({ error: "Error al actualizar usuario" });
  }
};

// ---------- PATCH /v1/users/:id ----------
export const patchUser = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

    const user = users.find(u => u.id === id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const { nombre, email } = req.body;

    if (email) {
      const emailExists = users.some(u => u.email === email && u.id !== id);
      if (emailExists) {
        return res.status(409).json({ error: "El email ya está registrado por otro usuario" });
      }
    }

    if (nombre !== undefined) user.nombre = nombre;
    if (email !== undefined) user.email = email;

    return res.status(200).json(user);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Error al actualizar parcialmente usuario" });
  }
};

// ---------- DELETE /v1/users/:id ----------
export const deleteUser = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

    const index = users.findIndex(u => u.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    users.splice(index, 1);

    res.set("X-User-Deleted", id.toString());
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ error: "Error al eliminar usuario" });
  }
};