const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const User = sequelize.define('usuario', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    login: { type: DataTypes.STRING, allowNull: true },
    username: { type: DataTypes.STRING, allowNull: true },
    password: { type: DataTypes.STRING, allowNull: true },
    rol: { type: DataTypes.INTEGER, allowNull: true },
  })
 };