const { getCategorias } = require('../controllers/getCategoria.js');
const  getProduct  = require('../controllers/getFakeProd.js')
const postProd = require('../controllers/postProd1.js')
const { Router } = require('express');
const productos   = require('../dbdummy.js');

//const {getFakeProd} = require('../dbdummy.js');

const router = Router();

router.get("/categ",  getCategorias);

router.get("/fakeprod", getProduct);

router.post("/postprod",  postProd );

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