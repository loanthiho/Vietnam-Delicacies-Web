const { stripePaymentMethod } = require("../services/stripePaymentServices");

const paymentByStripe = (req, res) => stripePaymentMethod(req, res);

module.exports = { paymentByStripe };