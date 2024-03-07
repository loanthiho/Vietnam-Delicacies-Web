const createNewOrder = async (req, res, next) => {
    const {
        customer_id,
        order_date,
        payment_method,
        total_amount,
        shipping_address } = req.body;
    if (customer_id && total_amount && shipping_address) {
        const rCOrder = await Order.create()
    }
}


module.exports = {
    createNewOrder
}