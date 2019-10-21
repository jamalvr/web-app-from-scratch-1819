"use strict";

import data from './modules/data.js';
import toggleMenu from './modules/toggleMenu.js';
import router from './router.js';

(function () {
    //// App structure
    const app = function () {
        console.log(data);
        data.ready()
            .then(function () {
                router();
                toggleMenu.init();
            })
    }

    app();
}());