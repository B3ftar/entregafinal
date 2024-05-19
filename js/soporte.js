

document.getElementById('dark-mode-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});

const btn = document.getElementById('button');

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Sending...';

   const serviceID = 'default_service';
   const templateID = 'template_8e8swft';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Send Email';
      alert('Sent!');
    }, (err) => {
      btn.value = 'Send Email';
      alert(JSON.stringify(err));
    });
});










document.addEventListener('DOMContentLoaded', function() {
    const submitBtn = document.getElementById('submit-btn');
    const questionSelect = document.getElementById('question');
    const resultContainer = document.getElementById('result-container');
    const result = document.getElementById('result');
    const characterImg = document.getElementById('character-img');

    submitBtn.addEventListener('click', function() {
        const answer = questionSelect.value;
        let character = '';
        let characterImgSrc = '';

        switch (answer) {
            case 'azul':
                character = 'Sonic';
                characterImgSrc = '../img/sonic.webp';
                break;
            case 'rojo':
                character = 'Mario';
                characterImgSrc = '../img/mario.png';
                break;
            case 'verde':
                character = 'Link';
                characterImgSrc = '../img/link.webp';
                break;
            case 'amarillo':
                character = 'Pikachu';
                characterImgSrc = '../img/pikachu.png';
                break;
            default:
                character = 'No se ha seleccionado un personaje.';
                characterImgSrc = '';
                break;
        }

        result.textContent = `Eres ${character}!`;
        characterImg.src = characterImgSrc;
        resultContainer.style.display = 'block';
    });
});

