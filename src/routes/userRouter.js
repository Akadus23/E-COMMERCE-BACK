const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/userController.js');

// Ruta para obtener todos los usuarios
router.get('/usuarios', usuarioController.obtenerUsuarios);

// Ruta para crear un nuevo usuario
router.post('/usuariosCrear', usuarioController.crearUsuario);

// Ruta para obtener un usuario por su ID
router.get('/usuarios/:id', usuarioController.obtenerUsuarioPorId);

// Ruta para actualizar un usuario
router.put('/usuarios/:id', usuarioController.actualizarUsuario);

// Ruta para eliminar un usuario
router.delete('/usuarios/:id', usuarioController.eliminarUsuario);

module.exports = router;