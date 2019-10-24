import state from './state.js';
import helper from './helper.js';
import createTemplate from './createtemplate.js';

const toggleMenu = {
    // Button functionality
    button: function (selector, callBack) {
        let button = document.querySelector(selector);

        button.addEventListener('click', function () {
            if (!button.classList.contains('active')) {
                button.classList.add('active');
                callBack(true);
            } else {
                button.classList.remove('active');
                callBack(false);
            }
        })
    },

    arrayEdits: function () {
        let sorted = [];

        if (state.statusSort) {
            sorted = helper.sort(state.globalPokemon, 'bmi');
        } else {
            sorted = helper.sort(state.globalPokemon, 'order');
        }

        if (state.statusFilter) {
            sorted = sorted.filter(function (pokemon) {
                return pokemon.bmi > 20;
            });
        }
        console.log(sorted);
        createTemplate.card(sorted);
    },

    init: function () {
        toggleMenu.button('.sort-bmi', function (active) {
            state.statusSort = active;
            toggleMenu.arrayEdits()
        });

        toggleMenu.button('.filter-bmi', function (active) {
            state.statusFilter = active;
            toggleMenu.arrayEdits()
        });
    },
};

export default toggleMenu;