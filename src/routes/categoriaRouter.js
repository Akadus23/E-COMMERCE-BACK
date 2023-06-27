const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController.js');

// Ruta para obtener todas las categorías
router.get('/categorias', categoriaController.obtenerCategorias);

// Ruta para crear una nueva categoría
router.post('/categoriasCrear', categoriaController.crearCategoria);

// Ruta para obtener una categoría por su ID
router.get('/categorias/:id', categoriaController.obtenerCategoriaPorId);

// Ruta para actualizar una categoría
router.put('/categorias/:id', categoriaController.actualizarCategoria);

// Ruta para eliminar una categoría
router.delete('/categorias/:id', categoriaController.eliminarCategoria);

module.exports = router;
