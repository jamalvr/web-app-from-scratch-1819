import helper from './helper.js';
import state from './state.js';

const data = {
    ready: function () {
        return new Promise(async function (resolve) {
            if (window.localStorage.getItem('pokemon') === null) {
                data.getPokemon()
                    .then(function (pokemonData) {
                        // Fill globalPokemon with pokemonData from the promise getPokemonData
                        state.globalPokemon = helper.map(pokemonData);
                        console.log(pokemonData);

                        // Store pokemonData in localStorage for future usage and to midigate the number of API requests with a page refresh
                        window.localStorage.setItem('pokemon', JSON.stringify(state.globalPokemon));
                        resolve();
                    });
            } else {
                state.globalPokemon = JSON.parse(window.localStorage.getItem('pokemon'));
                console.log('localStorage data');
                resolve();
            }
        });
    },

    getPokemon: function () {
        // Async + await to get data before executing following functions
        return new Promise(async function (resolve) {
            let apiBaseUrl = 'https://pokeapi.co/api/v2';
            let apiSubset = 'pokemon';
            let pokemonData = [];

            for (let pageIndex = 1; pageIndex <= 20; pageIndex++) {
                // Await fetch to resolve wait for each fetch -> resolving timing issues
                await fetch(apiBaseUrl + '/' + apiSubset + '/' + pageIndex)
                    .then(function (response) {
                        // Log status if you get a response that's not working
                        if (response.status !== 200) {
                            console.log('Woops, there is a problem with your pokemon. Status Code: ' + response.status);
                            return;
                        }

                        // Format response to JSON
                        return response.json();
                    })
                    .then(function (response) {
                        // Push each response to the array
                        pokemonData.push(response);
                    })
                    .catch(function (error) {
                        // Error handling in case of error
                        console.log('No pokemon because of:', error);
                    });
            }

            // Resolve promise this promise (getPokemonData) with fetched pokemonData from loop
            resolve(pokemonData);
        });
    },
};

export default data;