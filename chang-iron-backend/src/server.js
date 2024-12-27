const express = require('express');
const connectToDatabase = require('./mongoConnection');

const app = express();
const port = process.env.PORT;

// Middleware for parsing JSON bodies
app.use(express.json());

async function startServer() {
  const client = await connectToDatabase();
  const db = client.db("Test");
  const collection = db.collection("users");

  app.get('/', async (req, res) => {
    const data = await collection.find({}).toArray();
    res.send(data);
  });

  app.post("/addUser", async (req, res) => {
    try {
      const { email, password, membershipStatus, previousTransactions } = req.body;

      // Validation
      if (!email || !password || !membershipStatus || !previousTransactions) {
        return res.status(400).json({ error: "All fields are required." });
      }

      // Create a new document
      const newUser = {
        email,
        password,
        membershipStatus,
        previousTransactions,
      };
      const result = await collection.insertOne(newUser);

      res.status(201).json({
        message: "User added successfully",
        userId: result.insertedId,
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
