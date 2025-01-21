'use strict'

module.exports = {

    /**
     * This function handles the POST request that is made to the "/send-message" route
     * 
     * @param {*} context: Contains context behind POST request to "/send-message" route 
     */
    handleBundlePurchase: async (context) => {
        try {
            const { user_id, bundle_id, price_amount } = context.request.query
            // Need to update service to pull current bundles
            await strapi.service('api::handle-purchase.handle-purchase').updateUserBundles({ userId: user_id, bundleId: bundle_id })
            await strapi.service('api::handle-purchase.handle-purchase').addPaymentRecord({
                userId: user_id,
                productId: bundle_id,
                priceAmount: price_amount
            })

            context.send({ message: 'Processed bundle purchase' }, 201)
        }
        catch (error) {
            console.error(error)
            context.send({ error: 'Failed to generate checkout link' }, 500)
        }
    },


    handleMembershipPurchase: async (context) => {
        try {
            const { user_id, membership_id, price_amount } = context.request.query

            const checkQuery = `
                SELECT user_id FROM account_status WHERE user_id = '${user_id}'
            `;
            const result = await strapi.service('api::mysql-conn.mysql-conn').executeQuery(checkQuery);


            if (result.length == 0) {
                context.send({ error: "User ID does not exist in the account_status table." }, 400);
            }
            else {
                const updateQuery = `
                    UPDATE account_status
                    SET membership_status = '${membership_id}'
                    WHERE user_id = '${user_id}'
                `;

                await strapi.service('api::mysql-conn.mysql-conn').executeQuery(updateQuery);
                await strapi.service('api::handle-purchase.handle-purchase').addPaymentRecord({
                    userId: user_id,
                    productId: membership_id,
                    priceAmount: price_amount
                })

                context.send({ nessage: "Membership successfully bought" }, 201);
            }
        }
        catch (error) {
            console.error(error)
            context.send({ error: error }, 500)
        }
    }
}