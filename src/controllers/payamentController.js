const { Usuario, Oc, Detalleoc } = require('../db');
const mercadopago = require('mercadopago');
const nodemailer = require('nodemailer');
require('dotenv').config();

const { ACCESS_TOKEN, GOOGLE_TOKEN } = process.env;
const eURL = 'https://commerce-back-2025.up.railway.app';

// Configurar las opciones de envío de correo electrónico
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'all.market.henry@gmail.com',
    pass: GOOGLE_TOKEN,
  },
});

mercadopago.configure({
  access_token: 'TEST-4280842424471491-070211-516c8b20e0878a4ffcd8b1635fd20deb-1409292019',
});

const createPaymentPreference = async (req, res) => {
  try {
    const { loginuserparam, idocparam } = req.body;
    console.log('Si entra al payment: ', 'user:', loginuserparam, 'idoc:', idocparam);

    const itemsx = await Detalleoc.findAll({ where: { idoc: idocparam } });
    if (!itemsx) {
      return res.status(404).json({ error: 'Detalle de OC NO encontrada' });
    } else {
      console.log('Items de OC SI encontrada');
    }

    const oc = await Oc.findOne({ where: { idoc: idocparam } });
    if (!oc) {
      return res.json({ error: 'Orden de compra NO encontrada' });
    } else {
      console.log('ORDEN DE COMPRA SI ENCONTRADA:', oc);
    }

    const largarray = itemsx.length;
    console.log('ITEMS:');
    const itemsa = [];
    let detallestring = '';
    for (let i = 0; i < largarray; i++) {
      console.log(itemsx[i].dataValues);
      itemsa[i] = itemsx[i].dataValues;
      detallestring += ', ' + itemsx[i].dataValues.nombreproducto;
    }
    detallestring += '.';
    const arrayObjt = [];

    for (let i = 0; i < largarray; i++) {
      arrayObjt.push({
        id: itemsx[i].dataValues.idproducto,
        description: itemsx[i].dataValues.nombreproducto,
        title: itemsx[i].dataValues.nombreproducto,
        unit_price: itemsx[i].dataValues.valorunitario,
        quantity: itemsx[i].dataValues.cant,
      });
    }

    console.log('Items:', arrayObjt);

    const preference = {
      items: [
        {
          title: detallestring,
          unit_price: oc.valortotaloc,
          quantity: 1,
        },
      ],
      payer: {
        email: loginuserparam,
      },
      notification_url: `${eURL}/payment-notification`,
      external_reference: loginuserparam,
      back_urls: {
        success: `${eURL}/success`,
        pending: `${eURL}/pending`,
        failure: `${eURL}/failure`,
      },
    };

    const response = await mercadopago.preferences.create(preference);
    res.json(response.body);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const receiveWebhook = async (req, res) => {
  try {
    const payment = req.query;
    console.log('Payment:', payment);

    if (payment.type === 'payment') {
      const data = await mercadopago.payment.findById(payment['data.id']);
      console.log('Data:', data);

      // Verificar que el pago se haya realizado con éxito
      if (data.status === 'approved') {
        const usuarioId = parseInt(data.external_reference);
        const orden = await Oc.findOne({ where: { loginuser: data.payer.email } });

        if (orden) {
          await orden.update({ estadooc: 'aprobado' });

          const usuario = await Usuario.findOne({ where: { email: data.payer.email } });

          if (usuario) {
            const mailOptions = {
              from: 'all.market.henry@gmail.com',
              to: usuario.email,
              subject: 'Confirmación de compra',
              text: '¡Gracias por tu compra! Tu pago ha sido aprobado.',
            };

            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.error(error);
              } else {
                console.log('Correo electrónico enviado:', info.response);
              }
            });
          }
        }
      }
    }

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createPaymentPreference, receiveWebhook };
