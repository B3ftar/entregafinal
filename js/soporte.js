// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('supportForm');
    const responseMessage = document.getElementById('responseMessage');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const issue = formData.get('issue');

        // Aquí podrías añadir una llamada a un servidor para enviar la información
        // Simularemos una respuesta exitosa:
        setTimeout(() => {
            responseMessage.textContent = `Gracias, ${name}. Hemos recibido tu consulta y nos pondremos en contacto contigo en ${email}.`;
            responseMessage.style.display = 'block';
            form.reset();
        }, 1000);
    });
});
document.getElementById('dark-mode-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});
