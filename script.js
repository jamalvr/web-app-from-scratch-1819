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
    fetch('https://pokeapi.co/api/v2/pokedex/1/')
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                // Examine the text in the response
                response.json().then(function (pokemon) {
                    pokemonData.push(pokemon);
                    // return (pokemon);
                });
            }
        )
        .catch(function (error) {
            console.log('No pokemon because of:', error);
        });
}

app.init();