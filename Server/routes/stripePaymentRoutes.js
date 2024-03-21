const express = require('express');
const stripePaymentCtl = require('../controllers/stripePaymentCtl');
const router = express.Router();

router.post('/intents', stripePaymentCtl.paymentByStripe);

module.exports = router;