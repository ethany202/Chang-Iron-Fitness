const bcrypt = require('bcrypt')
const mysqlService = require('../../mysql-conn/services/mysql-conn'); // Adjust the path as needed

module.exports = {
  async authenticateUser(email: string, password: string) {
    try {
      // Connect to the MongoDB database
      const client = await mysqlService.connectToDatabase();
      const db = client.db("Users");
      const collection = db.collection("user_creds");

      // Fetch user by email
      const user = await collection.findOne({ user_email: email });

      // Check if the user exists
      if (!user) {
        return { success: false, status: 400, message: 'Email does not exist' };
      }

      // Verify password
      const passwordMatch = await bcrypt.compare(password, user.user_password);
      if (!passwordMatch) {
        return { success: false, status: 401, message: 'Password does not match' };
      }

      // Authentication successful
      return { success: true, status: 200, message: 'Authentication successful' };
    } catch (error) {
      console.error(error);
      throw new Error('Authentication failed');
    }
  },
};
