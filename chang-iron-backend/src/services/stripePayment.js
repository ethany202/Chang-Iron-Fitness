require('dotenv').config();

// Create a Stripe object with the API key
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_KEY);

const createCheckout = async (productName, priceAmount) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: productName,
                        // Change with inputted image LINK
                        images: ['https://firebasestorage.googleapis.com/v0/b/image-drive-13bfc.appspot.com/o/danieljahn%40outlook.com%2Fleegum.png?alt=media&token=471bfb55-8f7a-4cfe-ba3e-b116e6c93b6c'],
                        // description: `
                        //     For any questions, contact the coach through their provided email: ${coachEmail}
                        // `
                    },
                    unit_amount: priceAmount
                },
                quantity: 1
            }
        ],
        // Change success URL to redirect to a page that performs POST request and adds payment record to SQL database
        success_url: `https://youtube.com`,
        cancel_url: `https://google.com`,
    })

    return session.url
}

module.exports.createCheckout = createCheckout