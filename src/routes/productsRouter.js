const {Router} = require('express');
const  {  getProductos, crearProducto, actualizarProducto, eliminarProducto, } = require('../controllers/getProductos');
const { getProductoId } = require("../handlers/getProductoId")
const productsRouter = Router();

productsRouter.get("/productos", getProductos),
productsRouter.get("/:id", getProductoId),
productsRouter.post("/productos", crearProducto)
productsRouter.put("/productos", actualizarProducto),
productsRouter.delete("/productos", eliminarProducto)


module.exports = productsRouter;