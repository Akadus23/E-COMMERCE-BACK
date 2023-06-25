const { getProductoDetail } = require("../controllers/getProductosById")

const getProductoId = (req,res) => {
    const {id} = req.params;
    getProductoDetail(id)
    .then(response=> res.status(200).json (response))
     .catch(error=>res.status(400).json(error)) ;
    
};
  module.exports = { getProductoId }