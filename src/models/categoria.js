const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
 sequelize.define('categoria', {
  id: {  type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombrecat: { type: DataTypes.STRING, allowNull: true, },
  desccat: { type: DataTypes.STRING, allowNull: true, },
  });
};