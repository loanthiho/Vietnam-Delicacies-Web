const { Op } = require('sequelize');
const { Order, ProductCart, Product, OrderDetail } = require('../models');
const { resBadRequest, resInternalError, resSuccessData } = require('../utils/response');
const { isNumber, formatDate } = require('../utils/helper');
const orderdetail = require('../models/orderdetail');

const createNewOrder = async (req, res, next) => {
    const user_id = req.userData.id;
    const {
        payment_method,
        shipping_address,
        status,
        total_amount,
        product_cart_ids
    } = req.body;

    /**
     * Set data to insert into order table.
     */
    if (!status) { }
    const order = {
        customer_id: user_id,
        order_date: new Date(),
        payment_method,
        shipping_address,
        status: status ? status : "cho-xac-nhan",
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
            resSuccessData(res, pCartFIds, "Data order Detail")
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
                                resInternalError(res, "Can not remove product in shopping cart")
                            }
                        }
                        else {
                            resInternalError(res, "Can't not Decrease Product inventory!")
                        }
                    }
                    else {
                        resInternalError(res, "Create order detail Failed")
                    }
                }
                // resSuccessData(res, orderdetail, "Data order Detail")
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


module.exports = {
    createNewOrder
}