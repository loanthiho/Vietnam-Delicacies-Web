const { Op } = require('sequelize');
const { Order, ProductCart, Product, OrderDetail, File } = require('../models');
const { resBadRequest, resInternalError, resSuccessData, resNotFound } = require('../utils/response');
const { isNumber, formatDate } = require('../utils/helper');
const orderdetail = require('../models/orderdetail');
const order = require('../models/order');

const createNewOrder = async (req, res, next) => {
    const user_id = req.userData.id;
    const {
        payment_method,
        shipping_address,
        status,
        total_amount,
        total_quantity,
        product_cart_ids
    } = req.body;
    var isSuccess = true;
    var error = '';
    /**
     * Set data to insert into order table.
     */
    const order = {
        customer_id: user_id,
        order_date: new Date(),
        payment_method,
        shipping_address,
        status: status ? status : "cho-xac-nhan",
        total_quantity,
        total_amount
    };
    /**
     * Comfirm user exist.
     * Comfirm data filled enough.
     * 
     * */
    if (!product_cart_ids) {
        return resBadRequest(res, "Missing products_cart Ids");
    }
    else if (product_cart_ids.length === 0) {
        return resBadRequest(res, "Missing products_cart Ids");
    } else if (!Array.isArray(product_cart_ids)) {
        return resBadRequest(res, "Product cart ids must be an array!");
    }

    if (!total_amount) {
        return resBadRequest(res, "total_amount can not be null!")
    }
    else if (!isNumber(total_amount)) {
        return resBadRequest(res, "Total amount must be a number.")
    }

    if (total_amount && shipping_address) {
        const pCartFIds = await ProductCart.findAll({
            where: {
                id: {
                    [Op.in]: product_cart_ids
                }
            },
            include: [Product]
        });
        /**
         * Check does product cart exit with those ids product cart?
         */
        if (pCartFIds) {
            // resSuccessData(res, pCartFIds, "Data order Detail")
            /**
             * If Have product cart with these ids.
             */
            const rCOrder = await Order.create(order);
            if (rCOrder) {
                /**
                 * Create orderDetail for each product.
                 */
                for (let pCart of pCartFIds) {
                    const oDetail = {
                        product_id: pCart.product_id,
                        order_id: rCOrder.id,
                        quantity: pCart.quantity,
                        unit_price: pCart.Product.price,
                        total_price: pCart.Product.price * pCart.quantity,
                    }
                    const createOrderDetail = await OrderDetail.create(oDetail);
                    /**
                     * If Order detail create successfull:
                     * - Decrease the inventory.
                     * - delete it out of shopping cart.
                     */
                    if (createOrderDetail) {
                        const product_id = pCart.Product.id;
                        const oldInventory = pCart.Product.inventory;
                        var newInventory = oldInventory - pCart.quantity;
                        const decreaseProductInventory = await Product.update({ inventory: newInventory }, { where: { id: product_id } });
                        /**
                         * If Increase product successful:
                         * - delete product cart out of shopping cart.
                         */
                        if (decreaseProductInventory) {
                            const remove_ProCart = await ProductCart.destroy({ where: { id: pCart.id } });
                            if (!remove_ProCart) {
                                isSuccess = false;
                                resInternalError(res, "Can not remove product in shopping cart")
                            }
                        }
                        else {
                            isSuccess = false
                            resInternalError(res, "Can't not Decrease Product inventory!")
                        }
                    }
                    else {
                        isSuccess = false
                        resInternalError(res, "Create order detail Failed")
                    }
                }
                if (isSuccess) {
                    resSuccessData(res, rCOrder, "Order Successfully!")
                }
            }
            else {
                resInternalError(res, "Making order Faild, Internal server error!")
            }
        }
        else {
            resBadRequest(res, "There is no products with these id!");
        }
    }
    else {
        return resBadRequest(res, "Not enough feild!");
    }

    /**
     * Status:
     * - Chờ vận chuyển;
     * - Chờ giao hàng
     * - Đã giao
     * - Đã hủy
     * - Trả hàng
     */
}
/**
 * status ENUM;
 * - SHIPPED: The order have been shipped or dispatched.
 * - CANCELED: The order have been canceled by either the customer or seller.
 * - AWAITING_CONFIRMATION: The order awaiting confirm from store before being processed.
 * - RETURNED: The order have been returned from customer.
 */

const getAllOrder = async (req, res, next) => {
    const customer_id = req.userData.id;
    const status = req.query.status;
    var q;
    if (status) {
        q = { status: status }
    }
    const order = await Order.findAll({
        where: { customer_id: customer_id, ...q },
        include: [{ model: OrderDetail, include: [{ model: Product, include: [File] }] }]
    });
    /**
     * Check the user have order any product;
     * If user have order some product -> list product detail
     */
    if (order) {
        resSuccessData(res, order, "Get all order Successfully!")
    }
    else {
        resNotFound(res, "Can not find any order!")
    }
}

module.exports = {
    createNewOrder,
    getAllOrder
}