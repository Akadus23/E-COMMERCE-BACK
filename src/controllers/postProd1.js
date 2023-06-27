// postProd1.js
const { Producto } = require('../db');

const postProductos = async (req, res) => {
  try {
    const { id, nombreproducto, descproducto, colorproducto, fotoprinc, precioproducto, disponibproducto, fotosecund, categoria } = req.body;
    
    // Lógica para crear un nuevo producto en la base de datos
    const newProduct = await Producto.create({
      id,
      nombreproducto,
      descproducto,
      colorproducto,
      fotoprinc,
      precioproducto,
      disponibproducto,
      fotosecund,
      categoria
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error al crear un nuevo producto:', error);
    res.status(500).json({ error: 'Error al crear un nuevo producto' });
  }
};

module.exports = postProductos;