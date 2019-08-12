    const app = function () {
        getPokemonData()
            .then(function (pokemonData) {
                createPokemonCards(pokemonData);
            })
    };

    //// Request loop
    const getPokemonData = function () {
        // Async + await to get data before executing following functions
        return new Promise(async function (resolve, reject) {
            let apiBaseUrl = 'https://pokeapi.co/api/v2';
            let apiSubset = 'pokemon';
            let pokemonData = [];

            for (let pageIndex = 1; pageIndex <= 5; pageIndex++) {
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
                        pokemonData.push(response);
                        // console.log('Pokemon pushed: ' + pokemonData.length);
                    })
                    .catch(function (error) {
                        // Error handling in case of error
                        console.log('No pokemon because of:', error);
                    });
            }

            resolve(pokemonData);
        })
    };

    //// function for creating pokemon
    const createPokemonCards = function (pokemonData) {
        const cardContainer = document.getElementById('pokemon-cards');

        for (let i = 0; i < pokemonData.length; i++) {
            let template = `
            <li class="pokemon-card">
                <img src="${pokemonData[i].sprites.front_shiny}">
                <h2>${pokemonData[i].name}</h2>
            </li>
            `;

            console.log(template);
            cardContainer.innerHTML += template;
        };
    };

    //// Create custom templates to use later
    // Pokemon cards
    const pokemonTemplates = function (pokemon) {

    };

    const templatePokemonPage = function (pokemon) {

    };

    app();