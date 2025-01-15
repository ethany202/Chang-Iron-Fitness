'use strict'

module.exports = {

    /**
     * This function handles the POST request that is made to the "/send-message" route
     * 
     * @param {*} context: Contains context behind POST request to "/send-message" route 
     */
    generateBundleLink: async (context) => {

        try {
            const { userId, bundleId, bundleName, priceAmount } = context.request.body

            const bundleLink = await strapi.service('api::payment-checkout.payment-checkout').generateBundleLink({
                userId: userId,
                bundleId: bundleId,
                bundleName: bundleName,
                priceAmount: priceAmount
            })

            context.send({ message: 'Obtained bundle link', bundleLink: bundleLink }, 200)
        }
        catch (err) {
            context.send({ error: 'Failed to generate checkout link' }, 500)
        }
    },

    generateMembershipLink: async (context) => {

    }
}