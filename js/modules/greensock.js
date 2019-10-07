const greenSock = function () {
    let card = querySelector('.pokemon-card');

    TweenLite(card, 1, {
        y: -100
    }, {
        y: 0
    })
}