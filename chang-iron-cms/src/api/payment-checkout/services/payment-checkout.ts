import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_KEY);

module.exports = {
    async generateBundleLink({ userId, bundleId, bundleName, priceAmount }) {
        let successUrl = `http://localhost:1337/handle-purchase?user_id=${userId}&bundle_id=${bundleId}&price_amount=${priceAmount}`;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: bundleName,
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

            success_url: `${successUrl}&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `https://google.com`,
        })

        return session.url
    },

    async generateMembershipLink(userId) {

    }
}