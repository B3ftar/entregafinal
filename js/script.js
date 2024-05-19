
document.getElementById('dark-mode-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});


let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(n) {
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    slides[n].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

setInterval(nextSlide, 3000);



document.getElementById('toggleIconsBtn').addEventListener('click', function() {
    document.getElementById('iconContainer').classList.toggle('show');
});






const imagenes = [
    './img/43.webp',
    './img/4.webp',
    './img/434.jpg',
    './img/34.webp',
    './img/aw.webp',
    './img/v.webp',
    './img/d.jpg',
    './img/f.webp',
];

const nombres = [
    'The Witcher 3: Wild Hunt',
    'Red Dead Redemption 2',
    'Assassin\'s Creed: Odyssey',
    'God of War (2018)',
    'The Last of Us Part',
    'Horizon Zero Dawn',
    'Uncharted 4: A Thief\'s End',
    'Ghost of Tsushima'
];

const descripciones = [
    'Embárcate en una emocionante búsqueda para encontrar a la hija adoptiva del cazador de monstruos Geralt de Rivia.',
    'Vive la vida del forajido Arthur Morgan y explora el salvaje oeste en esta épica aventura de mundo abierto.',
    'Explora la antigua Grecia y conviértete en un legendario héroe espartano en este juego de acción y aventuras.',
    'Acompaña a Kratos, el dios de la guerra, en una odisea para redimir sus pecados pasados y enfrentar a los dioses del Olimpo.',
    'Sigue la historia de Joe en un mundo post-apocalíptico donde lucha por la supervivencia y la venganza.',
    'Descubre los misterios de un mundo dominado por máquinas en esta aventura de acción RPG.',
    'Únete a Nathan Drake en su última búsqueda de tesoros mientras viaja por todo el mundo en busca de un legendario tesoro pirata.',
    'Explora el Japón feudal como el samurái Jin Sakai y lucha contra la invasión mongol para salvar tu hogar.'
];

let contador = 0;

function generarCartas() {
    const cartasContainer = document.getElementById('cartas-container');
    cartasContainer.innerHTML = ''; // Limpiar contenedor
    for (let i = contador; i < contador + 4 && i < imagenes.length; i++) {
        const carta = document.createElement('div');
        carta.classList.add('carta');
        carta.innerHTML = `
            <img src="${imagenes[i]}" alt="${nombres[i]}">
            <h3>${nombres[i]}</h3>
            <p>${descripciones[i]}</p>
        `;
        cartasContainer.appendChild(carta);
    }
}

function moverIzquierda() {
    contador = Math.max(contador - 4, 0);
    generarCartas();
}

function moverDerecha() {
    if (contador + 4 < imagenes.length) {
        contador += 4;
        generarCartas();
    }
}

// Generar las primeras cartas al cargar la página
window.onload = generarCartas;




