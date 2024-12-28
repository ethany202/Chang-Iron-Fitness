const express = require('express')
const stripePayment = require('./src/services/stripe-payment')

const app = express()

app.post("/api/pull-checkout-link", async (req, res) => {
    try {

        // Pass image link
        // Pass product name
        // Pass price amount
        const paymentLink = await stripePayment.createCheckout(productName, priceAmount)
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: error })
    }
})