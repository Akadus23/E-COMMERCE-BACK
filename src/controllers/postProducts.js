

const { Producto } = require('../db.js');

// Crear un nuevo producto
const crearProducto = async (req, res, next) => {
  try {
    const { nombreproducto, descproducto, fotoprinc, precioproducto, disponibproducto, fotosecund, categori } = req.body;

    const nuevoProducto = await Producto.create({
      nombreproducto,
      descproducto,
      fotoprinc,
      precioproducto,
      disponibproducto,
      fotosecund,
      categori,
    });

    res.status(201).json(nuevoProducto);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  crearProducto,
};
