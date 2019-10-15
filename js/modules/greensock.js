//// SVG animation
const eaLoader = function () {
    if (document.getElementById('loader-container')) {
        // Individual elements
        let cadeau = document.getElementById('loader-cadeau');
        let controller = document.getElementById('loader-controller');
        let korting = document.getElementById('loader-korting');
        let cashback = document.getElementById('loader-cashback');

        // Grouped elements
        let product = document.getElementById('loader-product');
        let besparen = document.getElementById('loader-besparen');

        const tl = new TimelineMax({
            repeat: -1,
            yoyo: true
        });

        tl.to(product, 1, {
                css: {
                    left: '100px'
                }
            })
            .set(besparen, {
                css: {
                    zIndex: 1
                }
            }) // set is basically a 0-second duration tween
            .to(besparen, 1, {
                css: {
                    left: '100px'
                }
            });
    }
}

eaLoader();