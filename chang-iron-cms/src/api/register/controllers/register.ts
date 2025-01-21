const { Context } = require("koa"); // Strapi uses Koa under the hood
import registerService from "../services/register";

export default {
  async register(ctx) {
    try {
      const { email, first_name, last_name, password } = ctx.request.body;

      // Call the service to handle the registration
      const result = await registerService.registerUser(email, first_name, last_name, password);

      if (!result.success) {
        ctx.status = result.status;
        return (ctx.body = { error: result.message });
      }

      // Respond with success
      ctx.status = result.status;
      ctx.body = {
        message: result.message,
        userId: result.userId,
      };
    } catch (error) {
      console.error(error);
      ctx.status = 500;
      ctx.body = { error: "Internal server error" };
    }
  },
};
