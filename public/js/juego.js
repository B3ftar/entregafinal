document.addEventListener('DOMContentLoaded', () => {
   
    const gameTitleElement = document.getElementById('gameTitle');
    const gameDescriptionElement = document.getElementById('gameDescription');
    const gamePriceElement = document.getElementById('gamePrice');
    const gameCategoryElement = document.getElementById('gameCategory');
    const gameImageElement = document.getElementById('gameImage');


    const gameId = new URLSearchParams(window.location.search).get('id');
    

fetch(`./data/productos.json`)
    .then(response => response.json())
    .then(games => {
        const game = games.find(game => game.id === parseInt(gameId));
        if (game) {
            
            gameTitleElement.textContent = game.title;
            gameDescriptionElement.textContent = game.description;
            gamePriceElement.textContent = `Precio: $${game.price.toFixed(2)}`;
            gameCategoryElement.textContent = `Categoría: ${game.category}`;
            gameImageElement.src = game.image;

            const gameRequirementsElement = document.getElementById("gameRequirements");
            const requirementsListElement = document.getElementById("requirementsList");
            if (game.requirements && gameRequirementsElement && requirementsListElement) {
                gameRequirementsElement.style.display = "block";
                const requirements = game.requirements;
                const requirementsListItems = Object.entries(requirements).map(([key, value]) => {
                    return `<li>${key}: ${value}</li>`;
                });
                requirementsListElement.innerHTML = requirementsListItems.join("");
            } else {
                gameRequirementsElement.style.display = "none";
            }
        } else {
            console.error('Error: Juego no encontrado.');
        }
    })
    .catch(error => console.error('Error al obtener los detalles del juego:', error));
});
