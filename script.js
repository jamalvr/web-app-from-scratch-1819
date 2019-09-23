    //// Set global var
    var globalPokemon;

    // Set base routie hash
    if (location.hash === '') {
        location.hash = 'main';
    }

    //// Core App flow
    const app = function () {
        if (window.localStorage.getItem('pokemon') === null) {
            getPokemonData()
                .then(function (pokemonData) {
                    // Fill globalPokemon with pokemonData from the promise getPokemonData
                    globalPokemon = mapPokemon(pokemonData);

                    // Store pokemonData in localStorage for future usage and to midigate the number of API requests with a page refresh
                    window.localStorage.setItem('pokemon', JSON.stringify(globalPokemon));

                    // Create pokemonCards based on pokemonData
                    createPokemonCards();
                })
        } else {
            globalPokemon = JSON.parse(window.localStorage.getItem('pokemon'));
            console.log('localStorage data');
            createPokemonCards();
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

    //// Pokemon array edits
    // Filter pokemon
    const filterPokemon = function () {
        console.log('Filterrrrrr');

        let filterWeightButton = document.querySelector('.filter-weight');

        filterWeightButton.addEventListener(click, function () {
            let filteredPokemonData = globalPokemon.filter(function (pokemon) {
                return pokemon.weight > 100;
            });

            createPokemonCards(filteredPokemonData);
        })
    };

    // Sort pokemon
    const sortPokemonBMI = function () {

    };

    // Map pokemon
    const mapPokemon = function (pokemon) {
        return pokemon.map(function (pokemon) {
            let pokeData = {
                name: pokemon.name,
                sprite: pokemon.sprites.front_shiny,
                weight: pokemon.weight / 10,
                height: pokemon.height / 10,
            }

            // Add BMI to pokedata object with right formula
            pokeData.bmi = pokeData.weight / (pokeData.height * pokeData.height);
            return pokeData;
        });
    };

    //// Pokemon page templates
    // Pokemon overview page template
    const createPokemonCards = function () {
        const pageContainer = document.getElementById('page-content');

        // Clear innerHTML in case of coming back from the pokemonDetail page
        pageContainer.innerHTML = '';

        // Add template for each pokemon
        for (let i = 0; i < globalPokemon.length; i++) {
            let template = `
            <li class="pokemon-card">
                <a href="#pokemon/` + i + `"><img src="${globalPokemon[i].sprite}"></a>
                <h2>${globalPokemon[i].name}</h2>
            </li>
            `;

            pageContainer.innerHTML += template;
        };
    };

    // Pokemon detail page template
    const createPokemonPage = function (id) {
        let pokemon = globalPokemon[id];
        const pageContainer = document.getElementById('page-content');

        // Removes already existing HTML en replaces it with a single template
        let template = `
            <a href="#main">Terug naar home</a><br/>
            <div class="pokemon-page">
                <img src="${pokemon.sprite}">
                <h2>${pokemon.name}</h2>
                Mijn hoogte is: ${pokemon.height} en ik ben superdik, namelijk ${pokemon.weight}lb
            </div>
            `;

        pageContainer.innerHTML = template;
    };

    //// Initialize data
    app();

    //// Routers
    // Executes app when hash is 'main' -> is set globally at the top of the code
    routie({
        'main': function () {
            createPokemonCards();
        },

        // Router for the specific pokemon pages
        'pokemon/:id': function (id) {
            createPokemonPage(id);
        }
    });