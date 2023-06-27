const productos   = require('../db.js');


const getProduct = async (req, resp) => {
    try {
      resp.status(200).send(productos);
    } catch (error) {
      console.error(error);
      resp.status(500).send('Error al obtener los productos');
    }
  };
  
  module.exports = getProduct;