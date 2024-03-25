const { Op } = require('sequelize');
const { ProductCart, Cart, User, Product, File } = require('../models');
const { resSuccessData, resNotFound, resInternalError, resUnauthorized, resSuccess, resBadRequest } = require('../utils/response');
const { query } = require('express');

const getOneProductCart = async (req, res, next) => {
    const id = req.params.id;
    const productcart = await ProductCart.findOne({ where: { product_id: id } });
    if (productcart) {
        resSuccessData(res, productcart, "Get successfully!");
    } else { resNotFound(res, "productCart not found") }
}

const getAllProductCart = async (req, res, next) => {
    try {
        var q = {};
        const { ids } = req.body;
        if (ids && ids.length > 0) {
            q.id = {
                [Op.in]: ids
            }
        }
        var user_id = req.userData.id;
        const rCart = await Cart.findOne({ where: { user_id: user_id } });
        if (rCart) {
            const rProductCart = await ProductCart.findAll({
                where: { ...q, cart_id: rCart.id },
                include: [{ model: Product, include: [File], order: [[File, 'createdAt', 'DESC']] }],
            });
            if (rProductCart) {
                resSuccessData(res, rProductCart)
            }
        } else {
            resNotFound(res, "User Not found");
        }

    } catch (err) {
        resInternalError(res, undefined)
    }
}
const addToCart = async (req, res, next) => {
    const user_id = req.userData.id;
    const idProduct = req.params.id;
    const quantity = req.body.quantity;
    const status = req.body.status;

    // INITIAL DATA to insert into Product cart table ->> shopping cart
    const data_add_to_cart = {
        product_id: idProduct,
        quantity: quantity || 1,
        status: status
    }
    // CHECK quantity is true typeof data
    if (quantity) {
        if (typeof quantity === 'string') {
            data_add_to_cart.quantity = parseInt(quantity, 10);
        }
    }
    // Check that cart user.
    const res_found_cart = await Cart.findOne({ where: { user_id: user_id } });
    if (!res_found_cart) {
        return resNotFound(res, "User don't have shopping cart")
    }
    if (res_found_cart.id) {
        data_add_to_cart.cart_id = res_found_cart.id;
        // Request To CHECK data in shopping cart --
        const is_add_old_product = await ProductCart.findOne({
            where: {
                product_id: idProduct,
                cart_id: data_add_to_cart.cart_id
            }
        });
        if (!is_add_old_product) {
            const created_pro_cart = await ProductCart.create(data_add_to_cart);
            if (created_pro_cart) {
                resSuccessData(res, created_pro_cart, "Add to cart successfully!")
            }
            else if (!created_pro_cart) {
                resInternalError(res, "Create products failed!");
            }
        }
        else if (is_add_old_product) {
            var qty;
            var qtyFDb = is_add_old_product.quantity == null ? 1 : is_add_old_product.quantity;
            var qtyUdt = data_add_to_cart.quantity;
            qty = qtyFDb + qtyUdt;
            const update_cart = await ProductCart.update({ quantity: qty, status: data_add_to_cart.status }, { where: { id: is_add_old_product.id } });
            if (update_cart) {
                const is_udt_Success = await ProductCart.findByPk(is_add_old_product.id);
                if (is_udt_Success) {
                    return resSuccessData(res, is_udt_Success, "Increase quantity successful!");
                }
                else if (!is_udt_Success) {
                    return resNotFound(res, "Product updated not found!");
                }
            }
        }
    } else {
        resNotFound(res, "User's shopping cart can not be found!");
    }
}

const updateQty = async (req, res, next) => {
    const product_cart_id = req.params.id;
    const action = req.query.action;
    var qty = 0;
    const productCart = await ProductCart.findOne({ where: { id: product_cart_id } });
    if (productCart) {
        if (action === "increase") {
            qty = productCart.quantity > 49 ? 50 : productCart.quantity + 1;
            const udt_success = await ProductCart.update({ quantity: qty, status: req.body.status }, { where: { id: productCart.id } })
            if (udt_success) {
                const productCartUpdated = await ProductCart.findByPk(product_cart_id);
                if (productCartUpdated) {
                    resSuccessData(res, productCartUpdated, "Update quantity product cart successfully!")
                } else {
                    resNotFound(res, "Can not find product updated")
                }
            } else {
                resNotFound(res, "Update quantity failed")
            }
        } else if (action === "decrease") {
            qty = productCart.quantity < 2 ? 1 : productCart.quantity - 1;
            const udt_success = await ProductCart.update({ quantity: qty, quantity: qty, status: req.body.status }, { where: { id: productCart.id } })
            if (udt_success) {
                const productCartUpdated = await ProductCart.findByPk(product_cart_id);
                if (productCartUpdated) {
                    resSuccessData(res, productCartUpdated, "Increase product succesfully!")
                } else {
                    resNotFound(res, "Can not find product updated")
                }
            } else {
                resNotFound(res, "Update quantity failed")
            }
        }
        else {
            resBadRequest(res, "Need params: increase or decrease");
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
        else if (!response) {
            resInternalError(res, "Product cart can not found!");
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