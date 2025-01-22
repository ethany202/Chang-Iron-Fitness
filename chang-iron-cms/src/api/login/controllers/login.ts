'use strict'

module.exports = {
  async login(ctx) {
    try {
      const { email, password } = ctx.request.body;

      // Validate email and password
      if (!email || !password) {
        ctx.send({ error: 'Email and password are required' }, 400)
      }

      // Call service to validate the user
      // @ts-ignore
      const result = await strapi.service('api::login.login').authenticateUser(email, password);

      // Respond based on the service result
      if (!result.success) {
        ctx.send({ error: result.message }, result.status)

      }

      ctx.send('User logged in successfully', 200)
    } catch (error) {
      console.error(error);
      ctx.send({ error: 'Internal server error' }, 500)

    }
  },
};
