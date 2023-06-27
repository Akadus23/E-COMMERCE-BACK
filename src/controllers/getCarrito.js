const { carrocompra, Producto } = require('../../E-COMMERCE-BACK/src/db.js');
// ver el carrito
const verCarroCompra = async (req, res, next) => {
  try {
    const { idusuario } = req.params;

    const productosEnCarro = await carrocompra.findAll({
      where: { idusuario },
      include: { model: Producto,
    attributes: ['nombreproducto','precioproducto','fotoprinc']},
    });

    res.json(productosEnCarro);
  } catch (error) {
    next(error);
  }
};
// eliminar productos
const eliminarProductoCarro = async (req, res, next) => {
  try {
    const { idcarrocompra } = req.params;

    const resultado = await carrocompra.destroy({
      where: { idcarrocompra },
    });

    if (resultado === 0) {
      return res.status(404).json({ error: 'No se encontró el producto en el carro de compra' });
    }

    res.status(200).json({ mensaje: 'Producto eliminado del carro de compra' });
  } catch (error) {
    next(error);
  }
};
// agregarlos
const agregarProductoCarro = async (req, res, next) => {
  try {
    const { idusuario, idproducto } = req.body;

    const nuevoProductoCarro = await carrocompra.create({
      idusuario,
      idproducto,
    });

    res.status(201).json(nuevoProductoCarro);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  verCarroCompra,
  eliminarProductoCarro,
  agregarProductoCarro,
};