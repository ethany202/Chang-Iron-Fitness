'use strict';

import middlewares from "../../../../config/middlewares";

export default {
    routes: [
        {
            method: 'POST',
            path: '/contact-us',
            handler: 'contact-us.sendEmail',
            config: {
                policies: [],
                middlewares: [],
            },
        },
    ],
};