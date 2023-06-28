require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, DB_URL } = process.env;


const sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: DB_PORT,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            // Ref.: https://github.com/brianc/node-postgres/issues/2009
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(`${DB_URL}`, { logging: false, native: false });

const basename = path.basename(__filename);
const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    const modelDefiner = require(path.join(__dirname, "/models", file));
    modelDefiners.push(modelDefiner);
  });

modelDefiners.forEach((modelDefiner) => modelDefiner(sequelize));

const {
  Carrocompra,
  Categoria,
  Ordencompra,
  Usuario,
  Producto,
  Fotoprod,
  Review,
} = sequelize.models;

// Aca vendrían las relaciones entre los modelos

const initializeRelations = () => {
  Carrocompra.belongsTo(Usuario, { foreignKey: 'idusuario' });
  Usuario.hasOne(Carrocompra, { foreignKey: 'idusuario' });

  Carrocompra.belongsToMany(Producto, { through: 'prodxcarro', foreignKey: 'idcarrocompra' });
  Producto.belongsToMany(Carrocompra, { through: 'prodxcarro', foreignKey: 'idproducto' });

  Ordencompra.belongsTo(Usuario, { foreignKey: 'idusuario' });
  Usuario.hasMany(Ordencompra, { foreignKey: 'idusuario' });

  Ordencompra.belongsToMany(Producto, { through: 'prodxoc', foreignKey: 'idordencompra' });
  Producto.belongsToMany(Ordencompra, { through: 'prodxoc', foreignKey: 'idproducto' });

  Producto.hasMany(Review, { foreignKey: 'idproducto' });
  Review.belongsTo(Producto, { foreignKey: 'idproducto' });

  Producto.hasMany(Fotoprod, { foreignKey: 'idproducto' });
  Fotoprod.belongsTo(Producto, { foreignKey: 'idproducto' });
};

initializeRelations();

module.exports = {
  ...sequelize.models,
  sequelize,
};
