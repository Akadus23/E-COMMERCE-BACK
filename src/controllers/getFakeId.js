const axios = require('axios');
const getProdxId = async (req, resp) => {
  try {
    const response = await axios.get('http://190.100.208.178:3001/fakeprod');
    const products = response.data;
    const productId = req.params.idFake; // ID del producto que deseas obtener
    const product = products.find(item => item.id === parseInt(productId));
    if (product) {
      resp.json(product);
    } else {
      resp.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    resp.status(500).json({ message: 'Error al obtener el producto' });
  }
};
  module.exports =  getProdxId ;