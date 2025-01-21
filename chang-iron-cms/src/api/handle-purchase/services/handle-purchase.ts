module.exports = {
    async updateUserBundles({ userId, bundleId }) {
        if (!userId || !bundleId) {
            throw new Error("All fields are required.");
        }

        try {
            // Create a new document
            const userBundlesDoc = {
                userId,
                bundleId,
            };

            const result = await strapi.service('api::mongodb-conn.mongodb-conn').insertUserDoc(userBundlesDoc);

            return {
                message: "User added successfully",
                insertedId: result.insertedId,
            };
        }
        catch (err) {
            console.error(err)
            throw err;
        }

    },

    async addPaymentRecord({ userId, productId, priceAmount }) {
        if (!productId || !userId || !priceAmount) {
            throw new Error("All fields are required to add a payment record.");
        }

        try {
            // TODO: Check if paymentId and productId exist already
            const paymentId = Math.floor(10000 + Math.random() * 90000).toString();

            const query = `
                INSERT INTO payment_history (payment_id, product_id, user_id, amount)
                VALUES ('${paymentId}', '${productId}', '${userId}', '${priceAmount}')
                `

            await strapi.service('api::mysql-conn.mysql-conn').executeQuery(query);
        }
        catch (err) {
            console.error(err)
            throw err
        }
    }
}