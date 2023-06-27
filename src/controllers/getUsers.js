const { Usuario } = require('../db.js');

const getUsers = async (req, res, next) => {
  try {
    const users = await Usuario.findAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
};


module.exports = 
  getUsers;