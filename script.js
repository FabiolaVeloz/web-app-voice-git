// Trae el id del texto a cambiar
window.innerWidth = 800;
window.innerHeight = 600;
const controlTexto = document.getElementById('controlTexto');
controlTexto.classList.add('fs-6');

document.getElementById('startRecordingBtn').addEventListener('click', function () {
    startRecording();
});

document.getElementById('stopRecordingBtn').addEventListener('click', function () {
    stopRecording();
});

function startRecording() {
    document.getElementById('startRecordingBtn').classList.add('d-none');
    document.getElementById('stopRecordingBtn').classList.remove('d-none');

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
    recognition.lang = 'es-ES';

    recognition.onresult = function (event) {
        // Trae la información de todo lo que estuve hablando
        const transcript = event.results[0][0].transcript;
        document.getElementById('resultado').innerText = "Orden identificada: " + transcript;

        // Verificar diferentes instrucciones reconocidas por voz usando switch
        switch(true) {
            case transcript.toLowerCase().includes('cambia a tamaño 1'):
                // Cambia el tamaño del texto a 1
                controlTexto.classList.add('fs-1');
                break;
            case transcript.toLowerCase().includes('abrir una ventana nueva'):
                // Abre una nueva pestaña
                window.open('about:blank', '_blank');
                break;
            case transcript.toLowerCase().includes('abre página del tec'):
                // Abre la página del tec en una nueva ventana
                window.open('https://itp.itpachuca.edu.mx/', '_blank');
                break;
            case transcript.toLowerCase().includes('cambia dimensiones'):
                // Obtener la URL actual
                const urlActual = window.location.href;
                // Abrir una nueva ventana con la misma URL y dimensiones deseadas
                const nuevaVentana = window.open(urlActual, '', 'width=800,height=600');
                if (nuevaVentana) {
                // Cerrar la ventana actual
                window.close();
                }
                break;    
            case transcript.toLowerCase().includes('cerrar una ventana'):
                 window.open('', '_self', '');
                 window.close();
                 break
            case transcript.toLowerCase().includes('cerrar el navegador'):
                // Cierra el navegador
                var ventanas = window.open('', '_self', '');
                while (ventanas !== null) {
                ventanas.close();
                ventanas = window.open('', '_self', '');
            }
            break;
            default:
                // Instrucción no reconocida
                console.log('Instrucción no reconocida');
        }
    };

    recognition.onerror = function (event) {
        console.error('Error en el reconocimiento de voz: ', event.error);
    }

    recognition.start();
}

function stopRecording() {
    document.getElementById('startRecordingBtn').classList.remove('d-none');
    document.getElementById('stopRecordingBtn').classList.add('d-none');
}
