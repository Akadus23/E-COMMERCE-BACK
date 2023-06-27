const { Usuario } = require('../db.js');

const createUser = async (req, res, next) => {
    try {
      const { login, username, password, rol } = req.body;
  
      const newUser = await Usuario.create({
        login,
        username,
        password,
        rol,
      });
  
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  };
  module.exports = createUser;