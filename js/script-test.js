"use strict";

import data from './modules/data.js';
import toggleMenu from './modules/toggleMenu.js';
import router from './modules/router.js';

(function () {

    //// Set global var
    let globalPokemon = [];
    let statusFilter;
    let statusSort;

    //// App structure
    const app = function () {
        data.ready()
            .then(function () {
                router();
                toggleMenu.init();
            })
    }

    app();
}());