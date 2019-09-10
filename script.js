    //// Set global var
    // Set location for routie
    var globalPokemon;
    if (location.hash == '') {
        location.hash = 'main';
    }

    const app = function () {
        if (window.localStorage.getItem('pokemon') === null) {
            getPokemonData()
                .then(function (pokemonData) {
                    // Fill globalPokemon with pokemonData from the promise getPokemonData
                    globalPokemon = pokemonData;

                    // Store pokemonData in localStorage for future usage and to midigate the number of API requests with a page refresh
                    window.localStorage.setItem('pokemon', JSON.stringify(pokemonData));
                    createPokemonCards(pokemonData);
                })
        } else {
            globalPokemon = JSON.parse(window.localStorage.getItem('pokemon'));
            createPokemonCards(globalPokemon);
        }
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
        })
    };

    //// Pokemon page templates
    // Pokemon overview page template
    const createPokemonCards = function (pokemonData) {
        const pageContainer = document.getElementById('page-content');

        // Clear innerHTML in case of coming back from the pokemonDetail page
        pageContainer.innerHTML = '';

        // Add template for each pokemon
        for (let i = 0; i < pokemonData.length; i++) {
            let template = `
            <li class="pokemon-card">
                <a href="#pokemon/` + i + `"><img src="${pokemonData[i].sprites.front_shiny}"></a>
                <h2>${pokemonData[i].name}</h2>
            </li>
            `;

            pageContainer.innerHTML += template;
        };
    };

    // Pokemon detail page template
    const createPokemonPage = function (pokemon) {
        const pageContainer = document.getElementById('page-content');

        // Removes already existing HTML en replaces it with a single template
        let template = `
            <a href="#main">Terug naar home</a><br/>
            <div class="pokemon-page">
                <img src="${pokemon.sprites.front_shiny}">
                <h2>${pokemon.name}</h2>
                Mijn hoogte is: ${pokemon.height} en ik ben superdik, namelijk ${pokemon.weight}lb
            </div>
            `;

        pageContainer.innerHTML = template;
    };

    //// Pokemon array edits
    // Filter pokemon
    const filterPokemon = function () {
        let filteredPokemonData = globalPokemon.filter(function (pokemon) {
            return pokemon.weight > 100
        });
        createPokemonCards(filteredPokemonData);
    };

    // Map pokemon
    const sortPokemon = function () {
        let sortedPokemon = globalPokemon.map(function (pokemon) {
            // return pokemon.weight > 100
        });
        createPokemonCards(sortedPokemon);
    };

    //// Routers
    // Executes app when hash is 'main' -> is set globally at the top of the code
    routie('main', function () {
        app();
    });

    // Router for the specific pokemon pages
    routie('pokemon/:id', function (id) {
        let pokemon = globalPokemon[id];
        createPokemonPage(pokemon);
    });