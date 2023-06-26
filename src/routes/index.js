const express = require('express');
const router = express.Router();
const productoRoutes = require('./productRouter');
const usuarioRoutes = require('./userRouter');
const carritoRoutes = require('./carritoRouter');
const categoriaRoutes = require('./categoriaRouter');

// Rutas de productos
router.use(productoRoutes);

// Rutas de usuarios
router.use(usuarioRoutes);

// Rutas del carrito de compra
router.use(carritoRoutes);

// Rutas de categorías
router.use(categoriaRoutes);

module.exports = router;