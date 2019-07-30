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
    for (let pokemonIndex = 1; pokemonIndex <= 5; pokemonIndex++) {
        fetch('https://pokeapi.co/api/v2/pokemon-species/' + pokemonIndex)
            .then(function (response, reject) {
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
            })
             .catch(function (error) {
                 // Error handling in case of error
                 console.log('No pokemon because of:', error);
             });
    }
    // .then(function (response) {

    //     let pokemonDetailsUrl = response.pokemon_entries.map(function (pokemon_entry) {
    //         return pokemon_entry.pokemon_species.url;
    //     });
    //     return pokemonDetailsUrl;
    // })
    // .then(function (pokemonDetailsUrl) {
    //     console.log(pokemonDetailsUrl);

    //     // Push data to global variable
    //     pokemonData.push(pokemonDetailsUrl);
    // })
    // .catch(function (error) {
    //     // Error handling in case of error
    //     console.log('No pokemon because of:', error);
    // });
}

const mapData = function () {

}

app.init();