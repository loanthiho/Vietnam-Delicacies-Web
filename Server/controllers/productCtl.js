const { createProduct, getAllProduct, updateProduct, removeProduct } = require('../services/productServices')

const create = (req, res, next) => createProduct(req, res, next);
const update = (req, res, next) => updateProduct(req, res, next);
const remove = (req, res, next) => removeProduct(req, res, next);

const getAll = (req, res, next) => getAllProduct(req, res, next);
const getOne = (req, res, next) => {}

module.exports = {
    create,
    update,
    remove,
    getAll,
    getOne
}