const { getAllProductCart, getOneProductCart, addToCart, updateQty, removeProductCart } = require('../services/cartServices');
const getAll = (req, res, next) => getAllProductCart(req, res, next);
const getOne = (req, res, next) => getOneProductCart(req, res, next);
const addCart = (req, res, next) => addToCart(req, res, next);
const updateQuantity = (req, res, next) => updateQty(req, res, next);
const removeCart = (req, res, next) => removeProductCart(req, res, next);

module.exports = {
    getAll,
    getOne,
    addCart,
    updateQuantity,
    removeCart
}