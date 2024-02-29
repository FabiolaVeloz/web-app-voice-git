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

    var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
    recognition.lang = 'es-ES';
    
    recognition.onresult = function(event) {
        var transcript = event.results[0][0].transcript;
        document.getElementById('resultado').innerText = "Orden identificada: " + transcript;
    };
    
    recognition.start();
}

function stopRecording() {
    document.getElementById('startRecordingBtn').classList.remove('d-none');
    document.getElementById('stopRecordingBtn').classList.add('d-none');
}