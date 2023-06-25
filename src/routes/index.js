const { getCategorias } = require('../controllers/getCategoria.js');
const  getProduct  = require('../controllers/getFakeProd.js')
const postProd = require('../controllers/postProd1.js')
const { Router } = require('express');


//const {getFakeProd} = require('../dbdummy.js');
const router = Router();

router.get("/categ",  getCategorias);

router.get("/fakeprod", getProduct);

router.post("/postprod",  postProd )

module.exports = router ;