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
const getPokemonData = function () {
    let apiBaseUrl = 'https://pokeapi.co/api/v2';
    let apiSubset = 'pokemon-species';

    for (let pokemonIndex = 1; pokemonIndex <= 5; pokemonIndex++) {
        fetch(apiBaseUrl + '/' + apiSubset + '/' + pokemonIndex)
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
                console.log(response);
                pokemonData.push(response);
            })
            .catch(function (error) {
                // Error handling in case of error
                console.log('No pokemon because of:', error);
            });
    }
}

const mapData = function () {

}

app.init();