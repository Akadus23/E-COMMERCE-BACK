const { Router } = require('express');
require("dotenv").config();
const { auth } = require('express-openid-connect');
const {SECRET_KEY,CLIENT_ID,AUTH_URL,GOOGLE_TOKEN} = process.env;
const { createPaymentPreference, handlePaymentNotification, receiveWebhook } = require("../controllers/payamentController.js")
const {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto,
  actualizarBorrador,
} = require('../controllers/productController.js');

const {
  obtenerCarritoCompra,
  agregarProductoCarrito,
  eliminarProductoCarrito
} = require('../controllers/carritoController.js');

const {
  obtenerCategorias,
  crearCategoria,
  obtenerCategoriaPorId,
  actualizarCategoria,
  eliminarCategoria
} = require('../controllers/categoriaController.js');
const { postOCyDetalle} = require('../controllers/postOcDet.js');
const buscarProductos = require('../controllers/searchBarController.js');
const { obtenerDatosUsuarios ,obtenerDatosUsuario,actualizarIsBan,actualizarRol,actualizarUsuario } = require('../controllers/userController');
const {guardarUsuario} = require('../controllers/auth0Controller.js');
const { paginadoOc,ocDetalleLog } = require('../controllers/getOc.js');
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: `${SECRET_KEY}`,
  baseURL: 'https://e-commerce-front-alpha.vercel.app/',
  clientID: `${CLIENT_ID}`,
  issuerBaseURL: `${AUTH_URL}`
};
const {calificarProducto, getAllReviews, getReviewsUsuario, actualizarReview} = require('../controllers/reviewController.js')
const {paginadoUserOc} = require ('../controllers/exclusivoUser.js');

const router = Router();

router.get('/producto/buscar', buscarProductos);
router.get('/producto', buscarProductos);
router.post('/productoCrear', /*auth(config),*/ crearProducto);
router.get('/producto/:id', obtenerProductoPorId);
router.put('/producto/:id', /*auth(config),*/ actualizarProducto);
router.delete('/producto/:id', /*auth(config),*/ eliminarProducto);
// Ruta para actualizar el borrador de un producto por ID
router.put('/productos/:id/borrador', actualizarBorrador);

router.get('/usuarios/:idUsuario/carrito', auth(config), obtenerCarritoCompra);
router.post('/usuarios/:idUsuario/carritoCrear', /*auth(config),*/ agregarProductoCarrito);
router.delete('/usuarios/:idUsuario/carrito/:idProducto', /*auth(config),*/ eliminarProductoCarrito);

//este es la ruta para auth0 se supone
router.put('/usuarios/:id/actualizar', actualizarUsuario);
router.put('/usuarios/:id/isban', actualizarIsBan);
router.put('/usuarios/:id/rol', actualizarRol);
router.get('/usuarios/:sub', obtenerDatosUsuario);
router.get('/usuarios', obtenerDatosUsuarios);
//categorias
router.get('/categorias', obtenerCategorias);
router.post('/categoriasCrear',  crearCategoria);
router.get('/categorias/:id',  obtenerCategoriaPorId);
router.put('/categorias/:id', actualizarCategoria);
router.delete('/categorias/:id', eliminarCategoria);
// Rutas pagos 
router.post('/generar-orden', postOCyDetalle); /**aqui oc y detalle OK  */
router.post('/webhook', receiveWebhook);
 router.post('/create-order', createPaymentPreference);

 router.get("/success", async (req, res) => {
  try {
    // Obtener el correo electrónico del usuario desde la referencia externa
    const correoUsuario = req.query.external_reference;
    
    // Buscar la orden de compra por el correo electrónico del usuario
    const {Oc} = require('../db.js'); // Importa el modelo Oc
    const orden = await Oc.findOne({ where: { loginuser: correoUsuario } });

    if (orden) {
      // Actualizar el estado de la orden de compra a 'success'
      orden.estadooc = 'Exitoso';
      await orden.save();
      const fs = require('fs');
    const path = require('path');
    const nodemailer = require('nodemailer');
      // Enviar correo electrónico de confirmación al usuario
      const htmlFilePath = path.join(__dirname, '../html/mailpago.html');

      // Leer el contenido del archivo HTML
      const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'all.market.henry@gmail.com',
          pass: GOOGLE_TOKEN,
        },
      });

      const mailOptions = {
        from: 'all.market.henry@gmail.com',
        to: correoUsuario,
        subject: '¡Recibo de Compra!',
        html : htmlContent,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log('Correo electrónico enviado:', info.response);
        }
      });
    }

    res.send('Pago exitoso');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/pending", async (req, res) => {
  try {
    // Obtener el correo electrónico del usuario desde la referencia externa
    const correoUsuario = req.query.external_reference;

    // Buscar la orden de compra por el correo electrónico del usuario
    const {Oc} = require('../db.js'); // Importa el modelo Oc
    const orden = await Oc.findOne({ where: { loginuser: correoUsuario } });

    if (orden) {
      // Actualizar el estado de la orden de compra a 'pending'
      orden.estadooc = 'Pendiente';
      await orden.save();
    }

    res.send('Pago pendiente');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/failure", async (req, res) => {
  try {
    // Obtener el correo electrónico del usuario desde la referencia externa
    const correoUsuario = req.query.external_reference;

    // Buscar la orden de compra por el correo electrónico del usuario
    const {Oc} = require('../db.js'); // Importa el modelo Oc
    const orden = await Oc.findOne({ where: { loginuser: correoUsuario } });

    if (orden) {
      // Actualizar el estado de la orden de compra a 'failure'
      orden.estadooc = 'Fallido';
      await orden.save();
    }

    res.send('Pago fallido');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});



router.post('/payment-notification', handlePaymentNotification);


// Ruta para obtener todas las OCs con sus detalles
router.get('/ocs', paginadoOc);
router.get('/ocsUser', paginadoUserOc);

// Ruta para obtener los detalles de una OC por login de usuario
router.get('/ocs/:loginuser', ocDetalleLog);

//Rutas para las reviews
router.post("/review", calificarProducto);
router.get("/review/:usuarioId", getReviewsUsuario);
router.get("/reviews", getAllReviews);
router.put("/review", actualizarReview);


module.exports = router;