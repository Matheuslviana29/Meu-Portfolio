var typed = new Typed('.typing-text span', {
    strings: ['Desenvolvedor de Software', 'Estudante de ADS'],
    typeSpeed: 70,
    backSpeed: 50,
    loop: true
});

const form = document.getElementById("contact-form");
const statusMessage = document.getElementById("my-form-status");
const submitButton = form.querySelector(".btn");

const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    submitButton.disabled = true;
    submitButton.classList.add('is-sending');
    statusMessage.innerHTML = '';

    const data = new FormData(event.target);

    try {
        const response = await fetch(MINHA_CHAVE_API, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            statusMessage.innerHTML = "Obrigado! Sua mensagem foi enviada.";
            statusMessage.style.color = "var(--main-color)";
            form.reset();
            submitButton.classList.remove('is-sending');
            submitButton.classList.add('is-success');
        } else {
            const responseData = await response.json();
            if (Object.hasOwn(responseData, 'errors')) {
                statusMessage.innerHTML = responseData["errors"].map(error => error["message"]).join(", ");
            } else {
                statusMessage.innerHTML = "Oops! Houve um problema ao enviar seu formulário.";
            }
            throw new Error(statusMessage.innerHTML);
        }
    } catch (error) {
        statusMessage.innerHTML = "Oops! Houve um problema. Verifique se o formulário está ativado.";
        statusMessage.style.color = "red";
        submitButton.classList.remove('is-sending');
    } finally {
        setTimeout(() => {
            statusMessage.innerHTML = '';
            submitButton.classList.remove('is-success');
            submitButton.disabled = false;
        }, 4000);
    }
};

form.addEventListener("submit", handleFormSubmit);