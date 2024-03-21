const { resCreated, resNotFound } = require('../utils/response');

const stripe = require('stripe')(
    'sk_test_51OwGUn2LYl4iBKPGItx2bBD2ik9WRJA5RV159g0janbJBzaObTrimfoOeSZByMOgLAQeNLXASSxvWJDlWb3pAHU800aITnom6y'
);


const stripePaymentMethod = async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: 'vnd',
            automatic_payment_methods: {
                enabled: true,
            }
        });
        return res.json({ paymentIntent: paymentIntent.client_secret });
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }

}


module.exports = { stripePaymentMethod }