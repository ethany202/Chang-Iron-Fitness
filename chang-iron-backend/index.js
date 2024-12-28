const express = require('express')

const stripePayment = require('./src/services/stripe-payment')
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
    return res.send(data);
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

      return res.status(201).json({
        message: "User added successfully",
        insertedId: result.insertedId,
      });
    } catch (error) {
      console.error("Error adding user:", error);
      return res.status(500).send("Error adding user", error);
    }
  });

  app.post("/pull-checkout-link", async (req, res) => {
    try {

      const { imageLink, productName, priceAmount } = req.body
      const checkoutLink = await stripePayment.createCheckout(productName, priceAmount)

      return res.status(200).json({ checkoutLink: checkoutLink })
    }
    catch (error) {
      console.error(error)
      return res.status(500).json({ error: error })
    }
  })

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

startServer().catch(console.error);
