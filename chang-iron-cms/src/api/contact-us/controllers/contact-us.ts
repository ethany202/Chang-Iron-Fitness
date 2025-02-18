'use strict'

module.exports = {

    /**
     * This function handles the POST request that is made to the "/contact-us" route
     * 
     * @param {*} context: Contains context behind POST request to "/contact-us" route 
     */
    sendEmail: async (context) => {
        try {
            const { recipient, subject, text} = context.request.body;

            await strapi.plugins['email'].services.email.send({
                recipient,
                subject, 
                text
            })

            context.send({ message: 'Successfully sent email' }, 200)
        }
        catch (error) {
            context.send({ error: 'Failed to send an email' }, 500)
        }
    },

}