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
            process.exit(1);
        }
    },
    async insertUserDoc(userBundlesDoc) {
        const client = await strapi.service('api::mongodb-conn.mongodb-conn').connectToDatabase();
        const db = client.db("Users");
        const collection = db.collection("Bundles");
        const result = await collection.insertOne(userBundlesDoc);

        return result
    }
}