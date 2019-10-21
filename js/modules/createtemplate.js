import state from './state.js';

const createTemplate = {
    card: function (pokemon = state.globalPokemon) {
        const pageContainer = document.getElementById('page-content');

        // Clear innerHTML in case of coming back from the pokemonDetail page
        pageContainer.innerHTML = '';

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
    },

    page: function (id) {
        let pokemon = state.globalPokemon[id];
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
    }
};

export default createTemplate;