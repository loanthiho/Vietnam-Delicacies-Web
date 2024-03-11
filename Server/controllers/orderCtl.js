const { createNewOrder, getAllOrder } = require('../services/oderServices');

const create = (req, res, next) => createNewOrder(req, res, next);
const getAll = (req, res, next) => getAllOrder(req, res, next);



module.exports = {
    create,
    getAll
}