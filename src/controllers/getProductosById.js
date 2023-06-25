const { Productos } = require('../db.js');

const getProductoDetail = async (id) => {
    const productoId = await Productos.findByPk(id.toUpperCase());
    return productoId;
};


  
  module.exports = { getProductoDetail };