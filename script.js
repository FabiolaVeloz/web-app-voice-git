//Función para detectar la voz y escribir la información
document.getElementById('startRecordingBtn').addEventListener('click', function() {
    startRecording();
});

document.getElementById('stopRecordingBtn').addEventListener('click', function() {
    stopRecording();
});

function startRecording() {
    document.getElementById('startRecordingBtn').classList.add('d-none');
    document.getElementById('stopRecordingBtn').classList.remove('d-none');

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
    recognition.lang = 'es-ES';
    
    recognition.onresult = function(event) {
        // Trae la información de todo lo que estuve hablando
        const transcript = event.results[0][0].transcript;
        const keyword='fabiola';
        document.getElementById('resultado').innerText = "Orden identificada: " + transcript;

        // Verificar si la palabra 'pollito' está en el resultado
        if (transcript.toLowerCase().includes(keyword)) {
            console.log("Palabra encontrada");
        }
    };

    recognition.onerror = function(event){
    }
    
    recognition.start();
}

function stopRecording() {
    document.getElementById('startRecordingBtn').classList.remove('d-none');
    document.getElementById('stopRecordingBtn').classList.add('d-none');
}