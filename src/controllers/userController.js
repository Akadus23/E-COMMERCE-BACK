const { Usuario } = require('../db');

// Controlador para obtener todos los usuarios
async function obtenerUsuarios(req, res) {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener los usuarios' });
  }
}

// Controlador para crear un nuevo usuario
async function crearUsuario(req, res) {
  const { login, username, password, rol } = req.body;

  try {
    const usuario = await Usuario.create({
      login,
      username,
      password,
      rol
    });

    res.status(201).json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear el usuario' });
  }
}

// Controlador para obtener un usuario por su ID
async function obtenerUsuarioPorId(req, res) {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener el usuario' });
  }
}

// Controlador para actualizar un usuario
async function actualizarUsuario(req, res) {
  const { id } = req.params;
  const { login, username, password, rol } = req.body;

  try {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    usuario.login = login;
    usuario.username = username;
    usuario.password = password;
    usuario.rol = rol;

    await usuario.save();

    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar el usuario' });
  }
}

// Controlador para eliminar un usuario
async function eliminarUsuario(req, res) {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    await usuario.destroy();

    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar el usuario' });
  }
}

module.exports = {
  obtenerUsuarios,
  crearUsuario,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario
};
