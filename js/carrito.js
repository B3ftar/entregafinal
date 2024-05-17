document.addEventListener('DOMContentLoaded', () => {
    const gameList = document.getElementById('game-list');
    const cartItems = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total-amount');
    const buyButton = document.getElementById('buy-button');
    const buyGameButton = document.getElementById('buy-game-button');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let gamesData = [];

    const categoryMapping = {
        "RPG": "RPG",
        "Action": "Acción",
        "FPS": "FPS",
        "Indie": "Indie",
        "Stealth": "Sigilo",
        "Survival": "Supervivencia",
        "Simulation": "Simulación",
    };

    function renderGames() {
        if (!gameList) return;

        gameList.innerHTML = '';

        const selectedCategory = categoryFilter ? categoryFilter.value : '';
        const filteredGames = gamesData.filter(game => selectedCategory === '' || game.category === selectedCategory);

        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const searchedGames = filteredGames.filter(game => game.title.toLowerCase().includes(searchTerm));

        searchedGames.forEach(game => {
            const gameCard = createGameCard(game);
            gameList.appendChild(gameCard);
        });
    }

    fetch('../data/productos.json')
        .then(response => response.json())
        .then(games => {
            gamesData = games;
            renderGames();
        })
        .catch(error => console.error('Error al obtener los datos de los juegos:', error));

    function createGameCard(game) {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';

        const gameLink = document.createElement('a');
        gameLink.href = `juego.html?id=${game.id}`;

        const gameImage = document.createElement('img');
        gameImage.src = game.image;
        gameImage.alt = game.title;

        const gameTitle = document.createElement('div');
        gameTitle.className = 'game-title';
        gameTitle.textContent = game.title;

        const gamePrice = document.createElement('div');
        gamePrice.className = 'game-price';
        gamePrice.textContent = `$${game.price.toFixed(2)}`;

        const gameCategory = document.createElement('div');
        gameCategory.className = 'game-category';
        gameCategory.textContent = categoryMapping[game.category];

        const button = document.createElement('button');
        button.className = 'game-button';
        button.textContent = 'Añadir al Carrito';
        button.addEventListener('click', () => {
            addToCart(game);
            updateCart(); // Actualizar el carrito después de agregar un juego
        });

        gameLink.appendChild(gameImage);
        gameLink.appendChild(gameTitle);
        gameCard.appendChild(gameLink);
        gameCard.appendChild(gamePrice);
        gameCard.appendChild(gameCategory);
        gameCard.appendChild(button);

        return gameCard;
    }

    function addToCart(game) {
        const existingItem = cart.find(item => item.id === game.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...game, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function updateCart() {
        if (!cartItems || !totalAmount) return;

        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.title} - $${item.price.toFixed(2)} x ${item.quantity}`;
            
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', () => {
                removeFromCart(item);
                updateCart(); // Actualizar el carrito después de eliminar un juego
            });
            
            listItem.appendChild(deleteButton);
            cartItems.appendChild(listItem);
            total += item.price * item.quantity;
        });
        totalAmount.textContent = total.toFixed(2);
    }

    function removeFromCart(item) {
        const cartItem = cart.find(cartItem => cartItem.id === item.id);
        if (cartItem.quantity > 1) {
            cartItem.quantity--;
        } else {
            cart = cart.filter(cartItem => cartItem.id !== item.id);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    if (buyButton) {
        buyButton.addEventListener('click', () => {
            if (cart.length > 0) {
                alert('¡Compra realizada con éxito!');
                cart = [];
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCart();
            } else {
                alert('El carrito está vacío. Añade algunos juegos antes de comprar.');
            }
        });
    }

    // Listener de evento para el botón de compra en la página del juego
    if (buyGameButton) {
        buyGameButton.addEventListener('click', () => {
            const urlParams = new URLSearchParams(window.location.search);
            const gameId = parseInt(urlParams.get('id'));
            const game = gamesData.find(game => game.id === gameId);
            if (game) {
                addToCart(game);
                alert(`¡${game.title} añadido al carrito!`);
                window.location.href = 'catalogo.html';
            } else {
                alert('Error: Juego no encontrado.');
            }
        });
    }

    if (categoryFilter) {
        categoryFilter.addEventListener('change', renderGames);
    }
    if (searchInput) {
        searchInput.addEventListener('input', renderGames);
    }
    updateCart();
});

function solicitarTarjeta() {
    document.getElementById("credit-card-form").style.display = "block";
}

document.getElementById("credit-card-info").addEventListener("submit", function(event) {
    event.preventDefault();
    var formData = new FormData(this);
    if (validarCampos(formData)) {
        var tarjetaCredito = {
            "Número de Tarjeta": formData.get("card-number"),
            "Titular de la Tarjeta": formData.get("card-holder"),
            "Fecha de Vencimiento": formData.get("expiry-date"),
            "Código de Seguridad": formData.get("security-code")
        };
        procesarCompra(tarjetaCredito);
    } else {
        alert("Por favor, complete todos los campos del formulario de tarjeta de crédito.");
    }
});

function validarCampos(formData) {
    var cardNumber = formData.get("card-number");
    var cardHolder = formData.get("card-holder");
    var expiryDate = formData.get("expiry-date");
    var securityCode = formData.get("security-code");
    return cardNumber && cardHolder && expiryDate && securityCode;
}

function procesarCompra(tarjetaCredito) {
    alert("Compra procesada con éxito con la siguiente información de tarjeta de crédito:\n\n" +
          "Número de Tarjeta: " + tarjetaCredito["Número de Tarjeta"] + "\n" +
          "Titular de la Tarjeta: " + tarjetaCredito["Titular de la Tarjeta"] + "\n" +
          "Fecha de Vencimiento: " + tarjetaCredito["Fecha de Vencimiento"] + "\n" +
          "Código de Seguridad: " + tarjetaCredito["Código de Seguridad"]);
    limpiarCarrito();
}

function limpiarCarrito() {
    // Aquí puedes agregar la lógica para limpiar el carrito después de la compra
    var carrito = document.getElementById("cart-items");
    carrito.innerHTML = "";
    actualizarTotal(0);
}

function actualizarTotal(total) {
    document.getElementById("total-amount").textContent = total.toFixed(2);
}





