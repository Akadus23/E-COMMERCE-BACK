const { conn } = require('../db');
const categoria = require('../models/categoria');

const getCategorias = async (req, res) => {
  try {
    const Categoria = conn.models.Categoria;
    const categoriasData = await Categoria.findAll({
     order:[['nombrecat', 'asc']]
    });
    const categorias = categoriasData.map(categoria => ({
     id: categoria.id,
     nombrecat: categoria.nombrecat
   }));
     res.status(200).send(categorias);  
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los temperamentos');
  }
};
module.exports = { getCategorias };