document.addEventListener('DOMContentLoaded', () => {
    const gamesData = [
        {
            "id": 1,
            "title": "The Witcher 3",
            "category": "RPG",
            "price": 29.99,
            "image": "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg",
            "description": "Descripción de The Witcher 3..."
        },
        // Agrega el resto de los datos de los juegos aquí
    ];

    // Obtener parámetro de la URL (ID del juego)
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = parseInt(urlParams.get('id'));

    // Obtener elementos del DOM
    const gameTitle = document.getElementById('gameTitle');
    const gameDescription = document.getElementById('gameDescription');
    const gamePrice = document.getElementById('gamePrice');
    const gameCategory = document.getElementById('gameCategory');
    const gameImage = document.getElementById('gameImage');
    const buyButton = document.getElementById('buy-button');

    // Encontrar el juego correspondiente
    const game = gamesData.find(game => game.id === gameId);

    // Mostrar detalles del juego si se encuentra
    if (game) {
        gameTitle.textContent = game.title;
        gameDescription.textContent = game.description;
        gamePrice.textContent = `Precio: $${game.price.toFixed(2)}`;
        gameCategory.textContent = `Categoría: ${game.category}`;
        gameImage.src = game.image;
        
        // Agregar funcionalidad al botón de compra
        buyButton.addEventListener('click', () => {
            // Aquí puedes agregar la lógica para agregar este juego al carrito
            // y redirigir al usuario al catálogo
            addToCart(game);
            alert(`¡${game.title} añadido al carrito!`);
            window.location.href = 'catalogo.html';
        });
    } else {
        // Si el juego no se encuentra, mostrar un mensaje de error
        gameTitle.textContent = 'Juego no encontrado';
    }
});

// Función para agregar un juego al carrito
function addToCart(game) {
    let cart = localStorage.getItem('cart');
    cart = cart ? JSON.parse(cart) : [];
    cart.push(game);
    localStorage.setItem('cart', JSON.stringify(cart));
}
