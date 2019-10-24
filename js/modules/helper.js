const helper = {
    sort: function (array, data) {
        return array.sort(function (a, b) {
            return a[data] - b[data];
        });
    },

    // Map pokemon
    map: function (pokemon) {
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
    },
};

export default helper;