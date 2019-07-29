// App start
const app = {
    init: function () {
        getPokemonData();
        console.log(pokemonData);
    }
}

// Variable to store data in
let pokemonData = [];

// Request
getPokemonData = function () {
    fetch('https://pokeapi.co/api/v2/pokedex/1/')
        .then(function (response) {
            // Log status if you get a response that's not working
            if (response.status !== 200) {
                console.log('Woops, no pokemon for you. Status Code: ' + response.status);
                return;
            }

            // Format response to JSON
            return response.json();
        })
        .then(function (response) {
            // Push data to global variable
            pokemonData.push(response);
        })
        .catch(function (error) {
            // Error handling in case of error
            console.log('No pokemon because of:', error);
        });
}

app.init();