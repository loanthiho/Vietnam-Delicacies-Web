const { where } = require('sequelize');
const { ProductCart, Cart, User, Product } = require('../models');
const { resSuccessData, resNotFound, resInternalError, resUnauthorized } = require('../utils/response')

const getOneProductCart = async (req, res, next) => {
    const id = req.params.id;
    const productcart = await ProductCart.findOne({ where: { product_id: id } });
    if (productcart) {
        resSuccessData(res, productcart, "Get successfully!");
    } else { resNotFound(res, "productCart not found") }

}

const getAllProductCart = async (req, res, next) => {
    try {
        const dataCart = await Cart.findAll({
            where: { user_id: req.userData.id },
            include: [
                { model: ProductCart, include: [Product] },
                { model: User, attributes: { exclude: [['password']] } }
            ]
        });
        if (dataCart) {
            resSuccessData(res, dataCart, "Get all product successfully!");
        } else {
            resNotFound(res, "Product cart not found");
        }
    } catch (err) {
        resInternalError(res, error = { err, msg: "Error request to database!" });
    }
}

const addToCart = async (req, res, next) => {
    const user_id = req.userData.id;
    const idProduct = req.params.id;
    const dataAddToCart = {
        product_id: idProduct,
        quantity: req.body.quantity
    }
    const cart = await Cart.findOne({ where: { user_id: user_id }, include: User });
    const productcart = await ProductCart.findOne({ where: { product_id: idProduct } });
    if (cart && cart.User?.role === "customer") {
        if (productcart?.id) {
            var oldQty = 0;
            oldQty = productcart.quantity;
            if (oldQty === dataAddToCart.quantity) {
                oldQty += 1
                await ProductCart.update({ quantity: oldQty }, { where: { id: productcart.id } })
                    .then(result => resSuccessData(res, result, "Increase quantity successful!"))
                    .catch(err => resInternalError(res, "Can not add to cart!"));
            } else {
                await ProductCart.update({ quantity: dataAddToCart.quantity < 1 ? 1 : dataAddToCart.quantity }, { where: { id: productcart.id } })
                    .then(result => resSuccessData(res, result, `Update new quantity successful! qty:${dataAddToCart.quantity < 1 ? 1 : dataAddToCart.quantity}`))
                    .catch(err => resInternalError(res, "Can not add to cart!"));
            }
        } else {
            await ProductCart.create({ cart_id: cart.id, ...dataAddToCart })
                .then(result => resSuccessData(res, result, "Add to cart successfully!"))
                .catch(error => resInternalError(res, err = { error, msg: "Add product failed!" }));
        }
    } else {
        resUnauthorized(res);
    }
}

const updateQty = async (req, res, next) => {
    const product_id = req.params.id;
    const action = req.query.action;
    var qty = 0;
    const productCart = await ProductCart.findOne({ where: { product_id: product_id } });
    if (productCart) {
        if (action === "increase") {
            qty = productCart.quantity + 1;
            await ProductCart.update({ quantity: qty }, { where: { id: productCart.id } })
                .then(result => resSuccessData(res, result))
                .catch(err => resInternalError(res, error = { err, msg: "can't not update server error!" }));
        } else {
            qty = productCart.quantity < 1 ? 1 : productCart.quantity - 1;
            await ProductCart.update({ quantity: qty }, { where: { id: productCart.id } })
                .then(result => resSuccessData(res, result))
                .catch(err => resInternalError(res, err));
        }
    } else {
        resNotFound(res, "Product not found!")
    }
}

const removeProductCart = async (req, res, next) => {
    const pro_cart_id = req.params.id;
    try {
        const response = await ProductCart.findOne({ where: { id: pro_cart_id } });
        if (response) {
            await ProductCart.destroy({ where: { id: pro_cart_id } })
                .then(result => resSuccessData(res, result, "Delete product cart sucessfully!"))
                .catch(err => resInternalError(res, err));
        }
    }
    catch (err) {
        resInternalError(res, err)
    }
}

module.exports = {
    getAllProductCart,
    getOneProductCart,
    addToCart,
    updateQty,
    removeProductCart
}