module.exports = {
    async updateUserBundles({ userId, bundlesList }) {
        if (!userId || !bundlesList) {
            throw new Error("All fields are required.");
        }

        // Create a new document
        const userBundlesDoc = {
            userId,
            bundlesList,
        };

        const result = await strapi.service('api::mongodb-conn.mongodb-conn').insertUserDoc(userBundlesDoc);

        return {
            message: "User added successfully",
            insertedId: result.insertedId,
        };
    }
}