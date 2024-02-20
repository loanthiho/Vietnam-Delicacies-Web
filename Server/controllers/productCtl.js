const { createProduct, getAllProduct, updateProduct } = require('../services/productServices')

const create = (req, res, next) => createProduct(req, res, next);
const update = (req, res, next) => updateProduct(req, res, next);
const getAll = (req, res, next) => getAllProduct(req, res, next);

const getOne = (req, res, next) => {
    const data = req.body;
    res.status(200).json({
        message: "Get One items",
        data
    })
}


const updateProduct = (req, res, next) => {
    res.status(200).json({
        message: "create product"
    })
}


const deleteProduct = (req, res, next) => {
    res.status(200).json({ message: "Delete Product!" })
}

module.exports = {
    create,
    update,
    getAll,
    getOne,
    deleteProduct
}