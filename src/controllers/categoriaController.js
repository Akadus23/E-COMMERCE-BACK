const { Categoria } = require('../db');

// Controlador para obtener todas las categorías
async function obtenerCategorias(req, res) {
  try {
    const categorias = await Categoria.findAll();
    res.json(categorias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener las categorías' });
  }
}

// Controlador para crear una nueva categoría
async function crearCategoria(req, res) {
  const { nombrecat, desccat } = req.body;

  try {
    const categoria = await Categoria.create({
      nombrecat,
      desccat
    });

    res.status(201).json(categoria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear la categoría' });
  }
}

// Controlador para obtener una categoría por su ID
async function obtenerCategoriaPorId(req, res) {
  const { id } = req.params;

  try {
    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }

    res.json(categoria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener la categoría' });
  }
}

// Controlador para actualizar una categoría
async function actualizarCategoria(req, res) {
  const { id } = req.params;
  const { nombrecat, desccat } = req.body;

  try {
    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }

    categoria.nombrecat = nombrecat;
    categoria.desccat = desccat;

    await categoria.save();

    res.json(categoria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar la categoría' });
  }
}

// Controlador para eliminar una categoría
async function eliminarCategoria(req, res) {
  const { id } = req.params;

  try {
    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }

    await categoria.destroy();

    res.json({ mensaje: 'Categoría eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar la categoría' });
  }
}

module.exports = {
  obtenerCategorias,
  crearCategoria,
  obtenerCategoriaPorId,
  actualizarCategoria,
  eliminarCategoria
};
