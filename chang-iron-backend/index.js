const express = require('express')

const stripePayment = require('./src/services/stripePayment.js')
const connectToDatabase = require('./src/services/mongoConnection.js');
const mysql = require('./src/services/mysqlConnection.js')
const app = express();
const port = process.env.PORT;

// Middleware for parsing JSON bodies
app.use(express.json());

async function startServer() {
  const client = await connectToDatabase();
  const db = client.db("Users");
  const collection = db.collection("Bundles");

  // app.get('/', async (req, res) => {
  //   try{
  //     //connection to MongoDB database
  //     const data = await collection.find({}).toArray();

  //     //connection to mySQL specifically user_cred database
  //     const user_creds = 'SELECT * FROM user_creds';
  //     const results = await mysql.executeQuery(user_creds);

  //     const combinedData = {
  //       mongoData: data,
  //       userCreds: results,
  //   };

  //   // Send the combined data as JSON
  //   res.status(200).json(combinedData);

  //   }catch (error) {
  //       console.error('Error fetching data:', error);
  //       res.status(500).send('Error fetching data');
  //   }

  // });

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
