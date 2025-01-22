const { Context } = require("koa"); // Strapi uses Koa under the hood
import registerService from "../services/register";

export default {
  async register(ctx) {
    try {
      const { email, first_name, last_name, password } = ctx.request.body;

      // Call the service to handle the registration
      const result = await registerService.registerUser(email, first_name, last_name, password);

      if (!result.success) {
        ctx.send({ error: result.message }, result.status)
      }

      // Respond with success
      ctx.send({
        message: result.message,
        userId: result.userId,
      }, result.status)

    } catch (error) {
      ctx.send({ error: "Internal server error" }, 500)
    }
  },
};
