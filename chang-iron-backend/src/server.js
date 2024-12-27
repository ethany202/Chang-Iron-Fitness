const express = require('express');
const connectToDatabase = require('./mongoConnection');

const app = express();
const port = 3000;

async function startServer() {
  const client = await connectToDatabase(); 

  app.get('/', async (req, res) => {
    const db = client.db("your_database_name");
    const collection = db.collection("your_collection_name");
    const data = await collection.find({}).toArray();
    res.send(data);
  });

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

startServer().catch(console.error);