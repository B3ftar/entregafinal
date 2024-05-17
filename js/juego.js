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

            // Mostrar los requisitos mínimos si están disponibles
            const gameRequirementsElement = document.getElementById("gameRequirements");
            const requirementsListElement = document.getElementById("requirementsList");
            if (game.requirements && gameRequirementsElement && requirementsListElement) {
                gameRequirementsElement.style.display = "block"; // Mostrar la sección de requisitos
                const requirements = game.requirements;
                const requirementsListItems = Object.entries(requirements).map(([key, value]) => {
                    return `<li>${key}: ${value}</li>`;
                });
                requirementsListElement.innerHTML = requirementsListItems.join("");
            } else {
                gameRequirementsElement.style.display = "none"; // Ocultar la sección de requisitos si no están disponibles
            }
        } else {
            console.error('Error: Juego no encontrado.');
        }
    })
    .catch(error => console.error('Error al obtener los detalles del juego:', error));
});
