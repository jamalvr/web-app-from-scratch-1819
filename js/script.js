"use strict";

import data from './modules/data.js';
import router from './router.js';

(function () {
    //// App structure
    const app = function () {
        data.ready()
            .then(function () {
                router();
            })
    }

    app();
}());