const express = require('express')
const bcrypt = require('bcrypt')
const crypto = require('crypto');
const stripePayment = require('./src/services/stripePayment.js')
const connectToDatabase = require('./src/services/mongoConnection.js');
const mysql = require('./src/services/mysqlConnection.js')
const app = express();
const port = process.env.PORT;

// Middleware for parsing JSON bodies
app.use(express.json());

async function startServer() {
  
  // app.post("/add-user-bundle", async (req, res) => {
  //   try {
  //     const { userID, bundles } = req.body;

  //     // Validation
  //     if (!userID || !bundles) {
  //       return res.status(400).json({ error: "All fields are required." });
  //     }

  //     // Create a new document
  //     const newUser = {
  //       userID,
  //       bundles,
  //     };
  //     const result = await collection.insertOne(newUser);

  //     return res.status(201).json({
  //       message: "User added successfully",
  //       insertedId: result.insertedId,
  //     });
  //   } catch (error) {
  //     console.error("Error adding user:", error);
  //     return res.status(500).send("Error adding user", error);
  //   }
  // });

  app.post("/pull-checkout-link", async (req, res) => {
    try {

      const { user_id, imageLink,productType, productName, productID, priceAmount, product } = req.body
      const checkoutLink = await stripePayment.createCheckout(user_id, productType, productName, productID, priceAmount,product)

      return res.status(200).json({ checkoutLink: checkoutLink })
    }
    catch (error) {
      console.error(error)
      return res.status(500).json({ error: error })
    }
  })

  app.post("/register", async (req, res) => {
    try {
      const { email, first_name, last_name, password} = req.body;

      const existingUser = await mysql.executeQuery(`SELECT * FROM user_creds WHERE user_email = '${email}'`);
      if (existingUser.length > 0) {
        return res.status(400).json({ error: 'Email already exists' });
      }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = crypto.randomBytes(5).toString('hex'); // 5 bytes = 10 hex characters

    
    const insertUserQuery = `INSERT INTO user_creds (user_id, user_email, user_password) VALUES ('${userId}', '${email}', '${hashedPassword}')`;
    await mysql.executeQuery(insertUserQuery);

    const insertStatusQuery = `INSERT INTO account_status (user_id, membership_status, user_first_name, user_last_name) VALUES ('${userId}', '${'none'}', '${first_name}', '${last_name}')`;
    await mysql.executeQuery(insertStatusQuery);

        res.status(201).send({ message: 'User registered successfully', userId });

  } catch (error) {
    console.log(error); 
    res.status(500).json({ error: 'Internal server error' });
  }
  })

  app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const [user]  = await mysql.executeQuery(`SELECT * FROM user_creds WHERE user_email = '${email}'`);
      if (user.length === 0) {
        
        return res.status(400).json({ error: 'Email does not exist' });
      }

      const passwordMatch = await bcrypt.compare(password, user.user_password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Password does not match' });
      }
  
      // // Generate JWT token
      // const token = jwt.sign({ email: user.user_email }, 'secret');
      // res.status(200).json({ token });

      res.status(201).send({ message: 'User logged in successfully'});

    } catch (error) {
      console.log(error); 
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

// app.post("/add-payment", async (req, res) => {
//   try {
//     const { payment_id, product_id, user_id, amount } = req.body;

//     // Validation
//     if (!payment_id || !product_id || !user_id || !amount) {
//       return res.status(400).json({ error: "All fields are required." });
//     }

//     const query = `
//       INSERT INTO payment_history (payment_id, product_id, user_id, amount)
//       VALUES ('${payment_id}', '${product_id}', '${user_id}', '${amount}')
//     `;

//     await mysql.executeQuery(query);


//     res.status(201).json({ message: "Payment record added successfully." });
//   } catch (error) {
//     console.error("Error adding payment:", error);
//     res.status(500).json({ error: "Error adding payment." });
//   }
// });

const updateUserBundle = async (userID, bundles) => {
  if (!userID || !bundles) {
    throw new Error("All fields are required.");
  }

  // Create a new document
  const newUser = {
    userID,
    bundles,
  };


  const client = await connectToDatabase();
  const db = client.db("Users");
  const collection = db.collection("Bundles");
  const result = await collection.insertOne(newUser);

  return {
    message: "User added successfully",
    insertedId: result.insertedId,
  };
};

const addPaymentRecord = async (product_id, user_id, amount) => {
  if (!product_id || !user_id || !amount) {
    throw new Error("All fields are required to add a payment record.");
  }

  const payment_id = Math.floor(10000 + Math.random() * 90000).toString();

  const query = `
    INSERT INTO payment_history (payment_id, product_id, user_id, amount)
    VALUES ('${payment_id}', '${product_id}', '${user_id}', '${amount}')
  `;

  await mysql.executeQuery(query);
  return { message: "Payment record added successfully." };
};


app.get("/handle-purchase", async (req, res) => {
  try {
    const { user_id, product_type, bundle, membership, product_id, amount } = req.query;

    // Validation
    if (!user_id || !product_type) {
      return res.status(400).json({ error: "User ID and product type are required." });
    }

    // For bundle purchase
    if (product_type === "bundle") {
      if (!bundle) {
        return res.status(400).json({ error: "Bundles are required for a bundle purchase." });
      }

      try {
        // Call the reusable updateUserBundle function
        updateUserBundle(user_id, bundle);
        res.status(201).json({ message: "Bundle added successfully." });

      } catch (error) {
        console.error("Error adding user bundle:", error.message);
        return res.status(400).json({ error: error.message });
      }
    } 

    // For membership purchase
    else if (product_type === "membership") {
      if (!membership) {
        return res.status(400).json({ error: "Membership status is required for a membership purchase." });
      }

      // Check if the user exists in account_status
      const checkQuery = `
        SELECT user_id FROM account_status WHERE user_id = '${user_id}'
      `;
      const result = await mysql.executeQuery(checkQuery);

      console.log(result); 

      if (result.length == 0) {
        return res.status(404).json({ error: "User ID does not exist in the account_status table." });
      }

      // Update membership status in MySQL
      const updateQuery = `
        UPDATE account_status
        SET membership_status = '${membership}'
        WHERE user_id = '${user_id}'
      `;

    await mysql.executeQuery(updateQuery);

    res.status(201).json({ message: "Membership updated successfully." });

    } 
    
    // Invalid product type
    else {
      return res.status(400).json({ error: "Invalid product type." });
    }
    try{
      addPaymentRecord(product_id, user_id, amount);

    //   if (!payment_id || !product_id || !user_id || !amount) {
    //   return res.status(400).json({ error: "All fields are required." });
    // }

    // const query = `
    //   INSERT INTO payment_history (payment_id, product_id, user_id, amount)
    //   VALUES ('${payment_id}', '${product_id}', '${user_id}', '${amount}')
    // `;

    // await mysql.executeQuery(query);

    // res.status(201).json({ message: "Payment record added successfully." });

    // return res.status(200).json({
    //   message: "Membership/Bundle status and payment record updated successfully.",
    // });

    } catch {
      return res.status(400).json({
        error: "Payment details are required for adding the payment record.",
      });
    }
  } catch (error) {
    console.error("Error handling purchase:", error);
    res.status(500).json({ error: "Error handling purchase." });
  }
});

startServer().catch(console.error);



