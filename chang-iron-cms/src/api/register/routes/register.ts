export default {
    routes: [
      {
        method: "POST",
        path: "/register",
        handler: "register.register",
        config: {
          policies: [], // Add policies if needed
          middlewares: [], // Add middlewares if needed
        },
      },
    ],
  };
  