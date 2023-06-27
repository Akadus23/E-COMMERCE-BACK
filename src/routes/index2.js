
const { getProduct } = require('../controllers/getFakeProd.js')
const { Router } = require('express');

//const {getFakeProd} = require('../dbdummy.js');
const router = Router();



router.get("/fakeprod", getProduct);


module.exports = router ;