// App start
const app = new Promise(function (resolve, reject) {
    getPokemonData();
    createPokemonCards();
});

// Variable to store data in
let pokemonData = [];

// Request
const getPokemonData = function () {
    let apiBaseUrl = 'https://pokeapi.co/api/v2';
    let apiSubset = 'pokemon-species';

    for (let pageIndex = 1; pageIndex <= 5; pageIndex++) {
        fetch(apiBaseUrl + '/' + apiSubset + '/' + pageIndex)
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

// function for creating
//! Dit werkt niet door timing issue 
const createPokemonCards = function () {
    console.log(pokemonData);
    console.log(pokemonData.length);

    // for (let i = 0; i < pokemonData.length; i++) {
    //     let pokemon = pokemonData[i];
    //     console.log(pokemon);
    // }
};

const mapData = function () {

}

app.init();