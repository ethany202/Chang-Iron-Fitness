'use strict';

import middlewares from "../../../../config/middlewares";

export default {
    routes: [
        {
            method: 'GET',
            path: '/handle-bundle-purchase',
            handler: 'handle-purchase.handleBundlePurchase',
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: 'GET',
            path: '/handle-membership-purchase',
            handler: 'handle-purchase.handleMembershipPurchase',
            config: {
                policies: [],
                middlewares: []
            }
        }
    ],
};