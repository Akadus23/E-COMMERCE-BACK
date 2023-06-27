require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/shoppie`, {
  logging: false, 
  native: false, 
});
const basename = path.basename(__filename);
const modelDefiners = [];
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

  modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);

sequelize.models = Object.fromEntries(capsEntries);

const {  carrocompra, Categoria, Ordencompra, Usuario,  Producto, Fotoprod  } = sequelize.models; 


// Fotoprod.belongsToMany(Producto, { through: 'fotosdelproducto' });
// Fotoprod.hasmanysTo(Producto, { through: 'fotosdelproducto' });

// Usuario.belongsToMany(Ordencompra, { through: 'ocxusuario' });
// Ordencompra.belongsToMany(Usuario, { through: 'ocxusuario' });

// Producto.belongsToMany(Ordencompra, { through: 'prodxoc' });
// Ordencompra.belongsToMany(Producto, { through: 'prodxoc' });

// Producto.belongsToMany(Categoria, { through: 'prodxcateg' });

// Categoria.belongsToMany(Producto, { through: 'prodxcateg' });

module.exports = {...sequelize.models, conn: sequelize, };