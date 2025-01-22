const bcrypt = require('bcrypt')
const crypto = require('crypto');

const mongoService = require('../../mysql-conn/services/mysql-conn'); // Update path as necessary

export default {
  async registerUser(email: string, firstName: string, lastName: string, password: string) {
    try {
      // Connect to MongoDB
      const client = await mongoService.connectToDatabase();
      const db = client.db("Users");

      const userCollection = db.collection("user_creds");
      const statusCollection = db.collection("account_status");

      // Check if the user already exists
      const existingUser = await userCollection.findOne({ user_email: email });
      if (existingUser) {
        return { success: false, status: 400, message: "Email already exists" };
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Generate a unique user ID
      const userId = crypto.randomBytes(5).toString("hex"); // 5 bytes = 10 hex characters

      // Insert user into `user_creds` collection
      await userCollection.insertOne({
        user_id: userId,
        user_email: email,
        user_password: hashedPassword,
      });

      // Insert account status into `account_status` collection
      await statusCollection.insertOne({
        user_id: userId,
        membership_status: "none",
        user_first_name: firstName,
        user_last_name: lastName,
      });

      return { success: true, status: 201, message: "User registered successfully", userId };
    } catch (error) {
      console.error(error);
      throw new Error("Registration failed");
    }
  },
};
