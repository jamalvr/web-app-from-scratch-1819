import state from './state.js';
import toggleMenu from './toggleMenu.js';

const createTemplate = {
    pageContainer: document.getElementById('page-content'),
    list: document.createElement('ul'),

    menu: function () {
        let template = `
        <div class="filter-menu" >
            <div class="filter-submenu">
                <h3>Sorteer</h3>
                <button class="sort-bmi">BMI sort</button>
            </div>

            <div class="filter-submenu">
                <h3>Filter</h3> 
                <button class="filter-bmi">BMI filter</button> 
            </div> 
        </div>
        `

        this.pageContainer.innerHTML += template;
        toggleMenu.init();
    },

    card: function (pokemon = state.globalPokemon) {
        this.list.innerHTML = '';

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

            this.list.innerHTML += template;
        };
    },

    overview: function () {
        // Empty view
        this.pageContainer.innerHTML = '';
        this.menu();
        this.list.classList.add('content');
        this.pageContainer.appendChild(this.list);
        this.card();
    },
    // Of een empty view functie maken
    // Of een losse page template view maken

    page: function (id) {
        let pokemon = state.globalPokemon[id];
        // const pageContainer = document.getElementById('page-content');

        // Removes already existing HTML en replaces it with a single template
        let template = `
        <a href="#main">Terug naar home</a><br/>
        <div class="pokemon-page">
            <img src="${pokemon.sprite}">
            <h2>${pokemon.name}</h2>
            Mijn hoogte is: ${pokemon.height} en ik ben superdik, namelijk ${pokemon.weight}lb
        </div>
        `;

        this.pageContainer.innerHTML = template;
    }
};

export default createTemplate;