'use strict';

export default {
    routes: [
      {
        method: 'POST',
        path: '/login',
        handler: 'login.login',
        config: {
          auth: false, // Disable authentication if the login route should be public
        },
      },
    ],
  };
  