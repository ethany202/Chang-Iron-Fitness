'use strict'

module.exports = {

    /**
     * This function handles the POST request that is made to the "/send-message" route
     * 
     * @param {*} context: Contains context behind POST request to "/send-message" route 
     */
    handleBundlePurchase: async (context) => {

        try {
            context.send({ message: 'Processed bundle purchase' }, 200)
        }
        catch (error) {
            context.send({ error: 'Failed to generate checkout link' }, 500)
        }
    },

    handleMembershipPurchase: async (context) => {
        try {

        }
        catch (error) {

        }
    }
}