import { MongoClient, ServerApiVersion } from 'mongodb';

const mongoClientUri = process.env.MONGO_URI;
const client = new MongoClient(mongoClientUri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

module.exports = {

    async connectToDatabase() {
        try {
            await client.connect();
            console.log("Connected to MongoDB successfully!");
            return client;
        } catch (err) {
            console.error("Failed to connect to MongoDB", err);
            throw err;
        }
    },

    async obtainUserBundles(userId) {
        try {
            const client = await strapi.service('api::mongodb-conn.mongodb-conn').connectToDatabase();
            const db = client.db("Users");
            const collection = db.collection("Bundles");

            const result = await collection.findOne({ userId: userId })
            return result
        }
        catch (err) {
            throw err;
        }
    },

    async insertUserDoc(userBundlesDoc) {
        try {
            const client = await strapi.service('api::mongodb-conn.mongodb-conn').connectToDatabase();
            const db = client.db("Users");
            const collection = db.collection("Bundles");

            return await collection.insertOne(userBundlesDoc);
        }
        catch (err) {
            throw err;
        }
    },

    async updateBundles({ userId, newBundle }) {
        try {
            const client = await strapi.service('api::mongodb-conn.mongodb-conn').connectToDatabase();
            const db = client.db("Users");
            const collection = db.collection("Bundles");

            const updateDoc = {
                $push: {
                    bundles: newBundle
                }
            }

            return await collection.updateOne({ userId: userId }, updateDoc);
        }
        catch (err) {
            throw err;
        }
    }
}