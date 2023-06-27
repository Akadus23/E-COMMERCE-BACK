
const productos   = require('../dbdummy.js');


const getProduct = async (req,resp) =>
{
    try{
         resp.status(200).send(productos); 
    }
    catch(error){
    }
}

module.exports = {getProduct};