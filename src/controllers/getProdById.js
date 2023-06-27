const { Producto } = require('../db');

const getProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Producto.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
};

module.exports = getProductById;