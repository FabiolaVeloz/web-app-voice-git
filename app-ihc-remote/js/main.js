let datosRecibidos = []; // Array para almacenar los datos recibidos

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
        //Arreglo
        datosRecibidos = data;
        //Último dígito del arreglo
        const ultimoDato = datosRecibidos.pop();
        console.log('Último dato:', ultimoDato);
        //Sustitución en los parráfos
        const parrafoOrdenRecibida = document.getElementById('OrdenRecibida');
        parrafoOrdenRecibida.textContent = ultimoDato.instruccion;
        const parrafoHora = document.getElementById('Hora');
        parrafoHora.textContent = ultimoDato.fechaHora;
    } catch (error) {
        console.error('Error:', error);
    }
}


setInterval(recibirDatos, 2000);
