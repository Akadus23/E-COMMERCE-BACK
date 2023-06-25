const { Producto, conn } = require('../db');
let aux4 = [];
const postProd = async (req, resp) => {
const {id,nombreproducto,descproducto,colorproducto,fotoprinc,precioproducto,disponibproducto,fotosecund,categoria} = req.body;
let flagOk = 0;
 try {
   console.log('req.body:', req.body );
   const newProd = await Producto.create({id,nombreproducto,descproducto,colorproducto,fotoprinc,precioproducto,disponibproducto,fotosecund,categoria} ); 
   console.log('Se insertó correctamente');
   flagOk = 1;
   /** */
   console.log('postProd -> newProd: ', newProd);
   console.log('postProd -> newProd.dataValues: ', newProd.dataValues );
   aux4 = newProd.dataValues;
  
   console.log('aux4: ', aux4,'....'); 
   console.log('newProd: ', newProd,'....'); 
   return resp.status(201).send(newProd);  

 } catch (error) {
   flagOk = 0;
   console.error('Error al insertar:', error);
   return resp.status(404).send({ error: 'Error en consulta' });
 }
};

module.exports =  postProd ;