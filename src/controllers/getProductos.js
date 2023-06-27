const { Producto } = require('../db.js');

// Obtener todos los productos
const getProductos = async (req, res, next) => {
  try {
    const pageAsNumber = Number.parseInt(req.query.page);
    const sizeAsNumber = Number.parseInt(req.query.size);

    let page = 0;
    if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
      page = pageAsNumber
    }
    let size = 10;
    if(!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
      size = sizeAsNumber
    }

    const productos = await Producto.findAndCountAll({
      limit: size,
      offset: page * size,
    });
    res.json({
      content: productos.rows,
      totalPages: productos.count / size});
  } catch (error) {
    next(error);
  }
};

// Crear un nuevo producto
const crearProducto = async (req, res, next) => {
  try {
    const { nombreproducto, descproducto, precioproducto, disponibproducto, idcategoria } = req.body;

    const nuevoProducto = await Producto.create({
      nombreproducto,
      descproducto,
      precioproducto,
      disponibproducto,
      idcategoria,
    });

    res.status(201).json(nuevoProducto);
  } catch (error) {
    next(error);
  }
};

// Actualizar un producto existente
const actualizarProducto = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombreproducto, descproducto, precioproducto, disponibproducto, idcategoria } = req.body;

    const producto = await Producto.findByPk(id);

    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    await producto.update({
      nombreproducto,
      descproducto,
      precioproducto,
      disponibproducto,
      idcategoria,
    });

    res.json(producto);
  } catch (error) {
    next(error);
  }
};

// Eliminar un producto
const eliminarProducto = async (req, res, next) => {
  try {
    const { id } = req.params;

    const producto = await Producto.findByPk(id);

    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    await producto.destroy();

    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
};