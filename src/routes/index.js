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
const getCategorias = require('../controllers/getCategoria.js');
const getProduct = require('../controllers/getProduct');
const getProductById = require('../controllers/getProdById');
const postProductos = require('../controllers/postProd1');
const getUsers = require('../controllers/getUsers');
const createUser = require('../controllers/postUsers');
const { Router } = require('express');
const productos   = require('../db.js');

// Rutas del carrito de compra
router.use(carritoRoutes);

// Rutas de categorías
router.use(categoriaRoutes);

router.get("/categ",  getCategorias);

router.get("/fakeprod", getProduct);

router.get('/productos/:id', getProductById);

router.post("/postprod",  postProductos );

router.get('/users', getUsers);

router.post('/users', createUser);


router.get('/productos', (req, res) => {
 const page = parseInt(req.query.page) || 1;
 const perPage = parseInt(req.query.perPage) || 4;

 // Cálculo de los índices para la paginación
 const startIndex = (page - 1) * perPage;
 const endIndex = startIndex + perPage;

 // Obtener los productos correspondientes a la página actual
 const paginatedProductos = productos.slice(startIndex, endIndex);

 res.json(paginatedProductos);
});






module.exports = router ;