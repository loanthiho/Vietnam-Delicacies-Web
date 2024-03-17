const {
    createNewOrder,
    getAllOrder,
    sellerGetAllOrder,
    commonGetAllOrder,
    updateOrderStatus } = require('../services/oderServices');

const create = (req, res, next) => createNewOrder(req, res, next);
const commonGetAll = (req, res, next) => commonGetAllOrder(req, res, next);
const getAll = (req, res, next) => getAllOrder(req, res, next);
const sellerGetAll = (req, res, next) => sellerGetAllOrder(req, res, next);
const updateStatus = (req, res, next) => updateOrderStatus(req, res, next);



module.exports = {
    commonGetAll,
    create,
    getAll,
    sellerGetAll,
    updateStatus
}