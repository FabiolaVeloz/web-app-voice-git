window.innerWidth = 800;
window.innerHeight = 600;

let recognition; // Variable para almacenar el objeto de reconocimiento de voz
let restartInterval;

function startRecording() {
    document.getElementById('microfono-image').src = 'microfono-encendido.png';
    document.getElementById('microfono-image').style.animation = 'encender 1.3s ease-in-out infinite alternate';

    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
    recognition.lang = 'es-ES';
    const ordenIdentificada = document.getElementById('ordenIdentificada');
    recognition.onresult = function (event) {
        // Trae la información de todo lo que estuve hablando
        const transcript = event.results[0][0].transcript;
        if (transcript.toLowerCase().includes('comandos')) {

            ordenIdentificada.textContent = "Orden Identificada: " + transcript;
            document.querySelectorAll('.imagen-oculta').forEach(function (img) {
                img.classList.remove('imagen-oculta');
            });
            // Verificar diferentes instrucciones reconocidas por voz usando switch
            switch (true) {
                case transcript.toLowerCase().includes('muestra imagen feliz'):
                    enviarDatosAMockAPI('Muestra imagen feliz');
                    document.getElementById('imagen').src = 'feliz.jpeg';
                    break;
                case transcript.toLowerCase().includes('muestra imagen triste'):
                    document.getElementById('imagen').src = 'triste.jpeg';
                    enviarDatosAMockAPI('Muestra imagen triste');
                    break;
                case transcript.toLowerCase().includes('muestra imagen sorprendida'):
                    document.getElementById('imagen').src = 'sorprendida.jpeg';
                    enviarDatosAMockAPI('Muestra imagen sorprendida');
                    break;
                case transcript.toLowerCase().includes('muestra triángulo'):
                        document.getElementById('imagen').src = 'triangulo.jpeg';
                        enviarDatosAMockAPI('Muestra triangulo');
                break;
                case transcript.toLowerCase().includes('muestra rectángulo'):
                        document.getElementById('imagen').src = 'rectangulo.jpeg';
                        enviarDatosAMockAPI('Muestra rectangulo');
                break;
                case transcript.toLowerCase().includes('muestra círculo'):
                        document.getElementById('imagen').src = 'circulo.jpeg';
                        enviarDatosAMockAPI('Muestra circulo');
                break;
                default:
                    // Instrucción no reconocida
                    console.log('Instrucción no reconocida');
            }
        }
    };

    recognition.onerror = function (event) {
        console.error('Error en el reconocimiento de voz: ', event.error);
    }

    recognition.start();

    // Reinicia la grabación cada 5 segundos
    restartInterval = setInterval(function () {
        recognition.start();
    }, 2000);
}

function stopRecording() {
    if (recognition) {
        document.getElementById('microfono-image').src = 'microfono-apagado.png';
        document.getElementById('microfono-image').style.animation = 'none';
        ordenIdentificada.textContent = "Orden Identificada: ";
        recognition.stop();
        clearInterval(restartInterval); // Detiene el intervalo de reinicio
    }
}

function obtenerFechaHoraActual() {
    return new Date().toLocaleString();
}

// Función para enviar datos a MockAPI
function enviarDatosAMockAPI(instruccion) {
    const fechaHoraActual = obtenerFechaHoraActual();

    // Datos a enviar en la solicitud POST
    const datos = {
        instruccion: instruccion,
        fechaHora: fechaHoraActual
    };

    // Opciones de la solicitud
    const opciones = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    };

    // URL de MockAPI
    const urlMockAPI = 'https://6624267404457d4aaf9bbc2d.mockapi.io/comandos';

    // Enviar la solicitud POST
    return fetch(urlMockAPI, opciones)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud POST a MockAPI');
            }
            return response.json();
        })
        .then(data => {
            console.log('Registro exitoso en MockAPI:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
