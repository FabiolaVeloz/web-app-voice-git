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

        const url = 'https://6624267404457d4aaf9bbc2d.mockapi.io/comandos';
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




    } catch (error) {
        console.error('Error:', error);
    }
}

function esIgual(objA, objB) {
    return JSON.stringify(objA) === JSON.stringify(objB);
}

function manejarAccion(ultimoDato) {
    switch (true) {
        case /^hola\s+/i.test(ultimoDato.instruccion):
            document.getElementById('microfono-image').src = 'saludo.jpeg';
            break;
        case ultimoDato.instruccion.toLowerCase() === 'muestra imagen feliz':
            document.getElementById('microfono-image').src = 'feliz.jpeg';
            break;
        case ultimoDato.instruccion.toLowerCase() === 'muestra imagen triste':
            document.getElementById('microfono-image').src = 'triste.jpeg';
            break;
        case ultimoDato.instruccion.toLowerCase() === 'muestra imagen sorprendida':
            document.getElementById('microfono-image').src = 'sorprendida.jpeg';
            break;
        case ultimoDato.instruccion.toLowerCase() === 'muestra triangulo':
            document.getElementById('microfono-image').src = 'triangulo.jpeg';
            break;
        case ultimoDato.instruccion.toLowerCase() === 'muestra rectangulo':
            document.getElementById('microfono-image').src = 'rectangulo.jpeg';
            break;
        case ultimoDato.instruccion.toLowerCase() === 'muestra circulo':
            document.getElementById('microfono-image').src = 'circulo.jpeg';
            break;
        default:
            // Instrucción no reconocida
            console.log('Instrucción no reconocida');
    }
}


