document.addEventListener('DOMContentLoaded', () => {
    // Obtener los elementos del DOM
    const gameTitleElement = document.getElementById('gameTitle');
    const gameDescriptionElement = document.getElementById('gameDescription');
    const gamePriceElement = document.getElementById('gamePrice');
    const gameCategoryElement = document.getElementById('gameCategory');
    const gameImageElement = document.getElementById('gameImage');

    // Supongamos que tienes un objeto 'game' con los detalles del juego
    const gameId = new URLSearchParams(window.location.search).get('id');
    
    // Hacer una solicitud para obtener los detalles del juego con el ID proporcionado
    fetch(`../data/productos.json`)
        .then(response => response.json())
        .then(games => {
            const game = games.find(game => game.id === parseInt(gameId));
            if (game) {
                // Actualizar los elementos del DOM con los detalles del juego
                gameTitleElement.textContent = game.title;
                gameDescriptionElement.textContent = game.description;
                gamePriceElement.textContent = `Precio: $${game.price.toFixed(2)}`;
                gameCategoryElement.textContent = `Categoría: ${game.category}`;
                gameImageElement.src = game.image;
            } else {
                console.error('Error: Juego no encontrado.');
            }
        })
        .catch(error => console.error('Error al obtener los detalles del juego:', error));
});
