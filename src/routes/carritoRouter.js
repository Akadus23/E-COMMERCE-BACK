const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carritoController.js');

// Ruta para obtener el carrito de compra de un usuario
router.get('/usuarios/:idUsuario/carrito', carritoController.obtenerCarritoCompra);

// Ruta para agregar un producto al carrito de compra de un usuario
router.post('/usuarios/:idUsuario/carritoCrear', carritoController.agregarProductoCarrito);

// Ruta para eliminar un producto del carrito de compra de un usuario
router.delete('/usuarios/:idUsuario/carrito/:idProducto', carritoController.eliminarProductoCarrito);

// Resto de las rutas relacionadas con el carrito de compra...

module.exports = router;
