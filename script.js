    (function () {
        //// Set global var
        let globalPokemon = [];

        //// App structure
        const app = function () {
            dataReady()
                .then(function () {
                    router();
                    // sortPokemon();
                    // greenSock();
                })
        }

        //// Get data, if it's in localStorage or not
        const dataReady = function () {
            return new Promise(async function (resolve) {
                if (window.localStorage.getItem('pokemon') === null) {
                    getPokemonData()
                        .then(function (pokemonData) {
                            // Fill globalPokemon with pokemonData from the promise getPokemonData
                            globalPokemon = mapPokemon(pokemonData);
                            console.log(pokemonData);

                            // Store pokemonData in localStorage for future usage and to midigate the number of API requests with a page refresh
                            window.localStorage.setItem('pokemon', JSON.stringify(globalPokemon));
                            resolve();
                        });
                } else {
                    globalPokemon = JSON.parse(window.localStorage.getItem('pokemon'));
                    console.log('localStorage data');
                    resolve();
                }
            });
        };

        //// Request loop
        const getPokemonData = function () {
            // Async + await to get data before executing following functions
            return new Promise(async function (resolve) {
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
        // Callback = function in parameter inside another function
        const toggleButton = function (selector, callBack) {
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
        }

        toggleButton('.sort-bmi', function (active) {
            let sorted;
            if (active) {
                sorted = sort(globalPokemon, 'bmi');
            } else {
                sorted = sort(globalPokemon, 'order');
            }
            createPokemonCards(sorted);
        })

        toggleButton('.filter-bmi', function (active) {
            if (active) {
                let filteredPokemonData = globalPokemon.filter(function (pokemon) {
                    return pokemon.bmi > 20;
                });
                createPokemonCards(filteredPokemonData);
            } else {
                createPokemonCards(globalPokemon);
            }
        })

        // Sort pokemon
        // const sortPokemon = function () {
        const sort = function (array, data) {
            array.sort(function (a, b) {
                return a[data] - b[data];
            });
        }

        // Map pokemon
        const mapPokemon = function (pokemon) {
            return pokemon.map(function (pokemon) {
                let pokeData = {
                    name: pokemon.name,
                    sprite: pokemon.sprites.front_shiny,
                    weight: pokemon.weight / 10,
                    height: pokemon.height / 10,
                    order: pokemon.order,
                }

                // Add BMI to pokedata object with right formula
                pokeData.bmi = Math.round(pokeData.weight / (pokeData.height * pokeData.height));

                return pokeData;
            });
        };

        //// Pokemon page templates
        // Pokemon overview page template
        const createPokemonCards = function (pokemon = globalPokemon) {
            const pageContainer = document.getElementById('page-content');

            // Clear innerHTML in case of coming back from the pokemonDetail page
            pageContainer.innerHTML = '';

            console.log(pokemon);

            // Add template for each pokemon
            for (let i = 0; i < pokemon.length; i++) {
                let template = `
            <li>
                <a class="pokemon-card" href = "#pokemon/` + i + `">
                    <img src="${pokemon[i].sprite}">
                    <h2>${pokemon[i].name}</h2>
                    <ul class="stats"> 
                        <li class="order">#${pokemon[i].order}</li>
                        <li class="bmi">BMI: ${pokemon[i].bmi}</li>
                    </ul>
                </a>
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

        //// Routers
        // Executes app when hash is 'main' -> is set globally at the top of the code
        const router = function () {
            // Set base routie hash
            if (location.hash === '') {
                location.hash = 'main';
            }

            // Router for home page & detailpage
            routie({
                'main': function () {
                    createPokemonCards();
                },

                // Router for the specific pokemon pages
                'pokemon/:id': function (id) {
                    createPokemonPage(id);
                }
            });
        }

        //// Initialize data
        app();
    }());