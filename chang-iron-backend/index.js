const express = require('express');
const connectToDatabase = require('./src/services/mongoConnection');

const app = express();
const port = process.env.PORT;

// Middleware for parsing JSON bodies
app.use(express.json());

async function startServer() {
  const client = await connectToDatabase();
  const db = client.db("Users");
  const collection = db.collection("Bundles");

  app.get('/', async (req, res) => {
    const data = await collection.find({}).toArray();
    res.send(data);
  });

  app.post("/add-user-bundle", async (req, res) => {
    try {
      const { userID, bundles } = req.body;

      // Validation
      if (!userID || !bundles) {
        return res.status(400).json({ error: "All fields are required." });
      }

      // Create a new document
      const newUser = {
        userID,
        bundles,
      };
      const result = await collection.insertOne(newUser);

      res.status(201).json({
        message: "User added successfully",
        insertedId: result.insertedId,
      });
    } catch (error) {
      console.error("Error adding user:", error);
      res.status(500).send("Error adding user", error);
    }
  });

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

startServer().catch(console.error);
