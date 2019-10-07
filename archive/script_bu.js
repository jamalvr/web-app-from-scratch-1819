    var globalPokemon;
    const app = function () {
        if (location.hash == '') {
            location.hash = 'main';
        }

        if (window.localStorage.getItem('pokemon') === null) {
            console.log('loading from datacall');
            getPokemonData()
                .then(function (pokemonData) {
                    globalPokemon = pokemonData;
                    window.localStorage.setItem('pokemon', JSON.stringify(pokemonData));
                    console.log('setted local storage');
                    createPokemonCards(pokemonData);
                })
        } else {
            console.log('loading from localstorage');
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
        const pageContainer = document.getElementById('page-content');
        console.log('creating pokemon cards with data:');
        console.log(pokemonData);
        pageContainer.innerHTML = '';
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

    const createPokemonPage = function (pokemon) {
        const pageContainer = document.getElementById('page-content');
        console.log('hoi pokemon: ' + pokemon.name + ' met height ' + pokemon.height + '!');
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
    //// Create custom templates to use later
    // Pokemon cards
    const pokemonTemplates = function (pokemon) {

    };

    const templatePokemonPage = function (pokemon) {

    };

    app();

    routie('main', function () {
        createPokemonCards(globalPokemon);
    });
    routie('pokemon/:id', function (id) {

        let pokemon = globalPokemon[id];
        createPokemonPage(pokemon);
        //this gets called when hash == #users
    });