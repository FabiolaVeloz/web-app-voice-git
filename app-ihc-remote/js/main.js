let ultimoDatoAnterior = null; // Variable para almacenar el último dato anterior
setInterval(recibirDatos, 2000);

async function recibirDatos() {
    try {
        // Opciones de la solicitud
        const opciones = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const url = 'https://660c52433a0766e85dbdebe2.mockapi.io/comandos';
        // Recibir los datos de la URL proporcionada
        const response = await fetch(url, opciones);

        if (!response.ok) {
            throw new Error('Error en la solicitud GET a la URL');
        }

        const data = await response.json();
        console.log('Datos recibidos:', data);
        // Arreglo
        datosRecibidos = data;
        // Último dígito del arreglo
        const ultimoDato = datosRecibidos.pop();
        console.log('Último dato:', ultimoDato);

        // Verifica si el último dato ha cambiado
        if (!esIgual(ultimoDato, ultimoDatoAnterior)) {
            // Sustitución en los párrafos
            const parrafoOrdenRecibida = document.getElementById('OrdenRecibida');
            parrafoOrdenRecibida.textContent = ultimoDato.instruccion;
            const parrafoHora = document.getElementById('Hora');
            parrafoHora.textContent = ultimoDato.fechaHora;
            // Llama a la función para manejar las acciones basadas en el último dato
            manejarAccion(ultimoDato);
            // Actualiza el valor del último dato anterior
            ultimoDatoAnterior = ultimoDato;
        }

        // Verifica si el último dato es "hora actual" para mostrar u ocultar el botón
        if (ultimoDato && ultimoDato.instruccion.toLowerCase() === 'hora actual') {
            document.getElementById('botonHoraActual').style.display = 'inline-block';
        } else {
            document.getElementById('botonHoraActual').style.display = 'none';
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

function esIgual(objA, objB) {
    return JSON.stringify(objA) === JSON.stringify(objB);
}

function manejarAccion(ultimoDato) {
    switch (ultimoDato.instruccion.toLowerCase()) {
        case 'abre una ventana nueva':
            // Abre una nueva pestaña
            window.open('about:blank', '_blank');
            document.getElementById('microfono-image').src = 'página.png';
            break;
        case 'abre la página del tec':
            // Abre la página del tec en una nueva ventana
            window.open('https://www.tecnm.mx/', '_blank');
            document.getElementById('microfono-image').src = 'tec.png';
            break;
        case 'cambia dimensiones de la ventana':
            const urlActual = window.location.href;
            // Verifica si ya se abrió una ventana en esta iteración
            if (!ventanaAbierta) {
                // Abrir una nueva ventana con las dimensiones deseadas
                const nuevaVentana = window.open(urlActual, '', 'width=800,height=600');
                if (nuevaVentana) {
                    // Marcar que se ha abierto una ventana
                    ventanaAbierta = true;
                }
            }
            break;
        case 'cierra esta ventana':
            // Cierra la ventana actual
            window.open('', '_self', '');
            window.close();
            break;
        case 'hora actual':
            document.getElementById('microfono-image').src = 'reloj.png';
                // Preguntar al usuario si desea escuchar la hora actual
                if (confirm("¿Deseas que se diga la hora actual?")) {
                    decirHoraActual();
                }
                break;
        case 'consultar clima':
            document.getElementById('microfono-image').src = 'clima.png';
            var ciudad = prompt("Por favor, ingresa la ciudad para buscar el clima en Google:");
            if (ciudad) {
                var urlGoogleClima = 'https://www.google.com/search?q=clima+' + ciudad;
                window.open(urlGoogleClima, '_blank');
            } else {
                alert("Debes ingresar una ciudad para buscar el clima.");
            }
            break;
        case 'reproducir canción':
            document.getElementById('microfono-image').src = 'canción.png';
            var cancion = prompt("Por favor, ingresa el nombre de la canción:");
            if (cancion) {
                var urlYouTube = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(cancion);
                window.open(urlYouTube, '_blank');
            } else {
                alert("Debes ingresar el nombre de la canción para buscarla.");
            }
            break;
        default:
            // Instrucción no reconocida
            console.log('Instrucción no reconocida');
    }
}

function decirHoraActual() {
    var fecha = new Date();
    var hora = fecha.getHours();
    var minutos = fecha.getMinutes();
    // Convierte la hora en formato legible
    var horaLegible = hora + ":" + (minutos < 10 ? '0' : '') + minutos;
    // Utiliza la API de Text-to-Speech para decir la hora
    var synth = window.speechSynthesis;
    var utterance = new SpeechSynthesisUtterance("La hora actual es " + horaLegible);
    synth.speak(utterance);

    // Oculta el botón después de que se ha confirmado la hora actual
    document.getElementById('botonHoraActual').style.display = 'none';
}
