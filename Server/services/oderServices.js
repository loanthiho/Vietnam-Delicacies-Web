const { Op } = require('sequelize');
const { Order, ProductCart, Product, OrderDetail, File, User } = require('../models');

const { resBadRequest, resInternalError, resSuccessData, resNotFound } = require('../utils/response');
const { isNumber, formatDate } = require('../utils/helper');
const order = require('../models/order');
const { orderStatus, isValidStatus } = require('../utils/enum');
const { CHO_XAC_NHAN, CHO_LAY_HANG, CHO_GIAO_HANG, DANH_GIA, DA_HUY } = orderStatus;


const createNewOrder = async (req, res, next) => {
    const user_id = req.userData.id;
    const {
        payment_method,
        shipping_address,
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

    if (!total_quantity) {
        return resBadRequest(res, "total_quantity can not be null!")
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
        if (pCartFIds && pCartFIds.length > 0) {
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
                        order_id: rCOrder.id,
                        seller_id: pCart.Product?.seller_id,
                        product_id: pCart.product_id,
                        quantity: pCart.quantity,
                        status: CHO_XAC_NHAN,
                        unit_price: pCart.Product.price,
                        total_price: pCart.Product.price * pCart.quantity,
                    }
                    // return resSuccessData(res, oDetail, "data Order detail!");
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

                    const order = await Order.findOne({ where: { id: rCOrder.id }, include: [OrderDetail] });
                    if (!order) {
                        return resNotFound(res, "Can not find the order just created latest!")
                    }
                    return resSuccessData(res, order, "Order created Successfully!");
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
        return resBadRequest(res, "Vui Thêm Thông tin địa chỉ!");
    }
}
/**
 * status ENUM;
 * - SHIPPED: The order have been shipped or dispatched.
 * - CANCELED: The order have been canceled by either the customer or seller.
 * - AWAITING_CONFIRMATION: The order awaiting confirm from store before being processed.
 * - RETURNED: The order have been returned from customer.
 */

const commonGetAllOrder = async (req, res, next) => {
    try {
        const orders = await Order.findAll({
            include: [
                { model: User },
                {
                    model: OrderDetail,
                    include: [
                        { model: User },
                        { model: Product, include: [{ model: File }] }
                    ]
                },
            ]
        });
        return resSuccessData(res, orders, "Get all order successfully");
    }
    catch (error) {
        return resInternalError(res, error);
    }
}

const getAllOrder = async (req, res, next) => {
    const userId = req.userData.id;
    const status = req.query.status;
    var q = {};
    if (status) {
        if (!isValidStatus(status)) {
            return resBadRequest(res, `error: "${status}" is invalid order status!`)
        }
        q.status = status
    }
    if (req.userData.role === 'customer') {
        const orders = await Order.findAll({ where: { customer_id: userId } });
        var orderIds = orders && orders.length > 0 ? orders.map(order => order.id) : [];
        if (!orders) {
            return resNotFound(res, "Order can not be found!")
        }
        if (orderIds.length > 0) {
            const orderDetails = await OrderDetail.findAll({
                where: { ...q, order_id: orderIds },
                include: [
                    { model: Product, include: [File] }
                ]
            })
            if (!orderDetails) {
                return resNotFound(res, "Can not get all the order detail!")
            }
            return resSuccessData(res, orderDetails, "get order detail successfully!")
        }
        return resNotFound(res, "This customer have no order!")
    }
    else if (req.userData.role === 'seller') {
        const orderDetails = await OrderDetail.findAll({
            where: { seller_id: userId, ...q },
            include: [{ model: Product, include: [File] }]
        });
        if (!orderDetails) {
            return resNotFound(res, "Order detail not found!")
        }
        return resSuccessData(res, orderDetails, "request order successfully")
    }
    return resBadRequest(res, `user.role = ${req.userData.role} is not found!`)
    /**
    * Check the user have order any product;
    * If user have order some product -> list product detail
    */
}

const sellerGetAllOrder = async (req, res, next) => {
    const seller_id = req.userData.id;
    const status = req.query.status;
    var q;
    if (status) {
        if (!isValidStatus(status)) {
            return resBadRequest(res, `error: ${status} is invalid order status in ${{ orderStatus }} `)
        }
        q = { status: status };
    }
    try {

    }
    catch (error) {
        return resNotFound(res, error)
    }
}


const updateOrderStatus = async (req, res, next) => {
    const order_detail_id = req.params.id;
    const { status } = req.query;
    if (!isValidStatus(status)) {
        return resBadRequest(res, `error: ${status} is invalid status!`);
    }
    const rUpdate = await OrderDetail.update({ status: status }, { where: { id: order_detail_id } });
    if (rUpdate) {
        const order_detail_after_update = await OrderDetail.findByPk(order_detail_id);
        if (!order_detail_after_update) {
            return resNotFound(res, "Order status after update not found!");
        }
        return resSuccessData(res, order_detail_after_update, "Update status successfully!");
    }
    return resInternalError(res, "Update order status Failed!");
}

module.exports = {
    createNewOrder,
    getAllOrder,
    sellerGetAllOrder,
    commonGetAllOrder,
    updateOrderStatus
}