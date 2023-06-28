const axios = require('axios');
const { Producto, conn } = require('../db');

const insertarProductos = async () => {
  try {
    const response = await axios.get('http://localhost:3001/fakeprod');
    const productos = response.data;

    for (const producto of productos) {
      const {
        nombreproducto,
        descproducto,
        colorproducto,
        fotoprinc,
        precioproducto,
        disponibproducto,
        fotosecund,
        categoria
      } = producto;

      const nombreRecortado = nombreproducto.substring(0, 255);

      await Producto.create({
        nombreproducto: nombreRecortado,
        descproducto: nombreRecortado,
        colorproducto,
        fotoprinc,
        precioproducto,
        disponibproducto,
        fotosecund,
        categoria
      });
    }

    console.log('Productos insertados correctamente');
  } catch (error) {
    console.error('Error al insertar:', error);
  }
};

insertarProductos();
