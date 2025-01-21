'use strict'

module.exports = {
  async login(req: any, res: any) {
    try {
      const { email, password } = req.body;

      // Validate email and password
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      // Call service to validate the user
      // @ts-ignore
      const result = await strapi.service('api::login.login').authenticateUser(email, password);

      // Respond based on the service result
      if (!result.success) {
        return res.status(result.status).json({ error: result.message });
      }

      return res.status(200).send({ message: 'User logged in successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
};
