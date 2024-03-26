// Trae el id del texto a cambiar
window.innerWidth = 800;
window.innerHeight = 600;



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
        document.getElementById('resultado').innerText = "Orden Identificada: " + transcript;

        // Verificar diferentes instrucciones reconocidas por voz usando switch
        switch(true) {
            case transcript.toLowerCase().includes('abre una ventana nueva'):
                // Abre una nueva pestaña
                window.open('about:blank', '_blank');
                break;
            case transcript.toLowerCase().includes('abre la página del tec'):
                // Abre la página del tec en una nueva ventana
                window.open('https://itp.itpachuca.edu.mx/', '_blank');
                break;
            case transcript.toLowerCase().includes('cambia dimensiones de la ventana'):
                // Obtener la URL actual
                const urlActual = window.location.href;
                // Abrir una nueva ventana con la misma URL y dimensiones deseadas
                const nuevaVentana = window.open(urlActual, '', 'width=800,height=600');
                if (nuevaVentana) {
                // Cerrar la ventana actual
                window.close();
                }
                break;    
            case transcript.toLowerCase().includes('cierra esta ventana'):
                 window.open('', '_self', '');
                 window.close();
                 break
            case transcript.toLowerCase().includes('cierra el navegador'):
                // Cierra el navegador
                var ventanas = window.open('', '_self', '');
                while (ventanas !== null) {
                ventanas.close();
                ventanas = window.open('', '_self', '');
            }
            break;
            case transcript.toLowerCase().includes('muestra historial en nueva ventana'):
                // Muestra el historial en una nueva ventana
                var historialVentana = window.open('', '_blank');
                var historial = window.history;
                for (var i = 0; i < historial.length; i++) {
                historialVentana.document.write(historial[i] + '<br>');
                }
            break;
            case transcript.toLowerCase().includes('muestra mi geolocalización'):
                // Muestra la geolocalización en Google Maps
                navigator.geolocation.getCurrentPosition(function(position) {
                var latitud = position.coords.latitude;
                var longitud = position.coords.longitude;
                var urlGoogleMaps = 'https://www.google.com/maps?q=' + latitud + ',' + longitud;
                window.open(urlGoogleMaps, '_blank');
        });
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
