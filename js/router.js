import createTemplate from './modules/createtemplate.js';

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
            createTemplate.overview();
        },

        // Router for the specific pokemon pages
        'pokemon/:id': function (id) {
            createTemplate.page(id);
        }
    });
};

export default router;