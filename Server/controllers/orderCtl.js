const { createNewOrder } = require('../services/oderServices');

const create = (req, res, next) => createNewOrder(req, res, next);



module.exports = {
    create
}