'use strict';

import middlewares from "../../../../config/middlewares";

export default {
    routes: [
        {
            method: 'POST',
            path: '/bundle-checkout',
            handler: 'payment-checkout.generateBundleLink',
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: 'POST',
            path: '/membership-checkout',
            handler: 'payment-checkout.generateMembershipLink',
            config: {
                policies: [],
                middlewares: []
            }
        }
    ],
};