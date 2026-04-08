// --- OIO ONE: CHAT PRO (ESTILO WHATSAPP) ---

let mediaRecorder;
let audioChunks = [];

function configurarAudioWhatsApp() {
    const btnAudio = document.getElementById('btnAudioHold');
    if(!btnAudio) return;

    // Iniciar ao encostar o dedo
    btnAudio.onpointerdown = async (e) => {
        e.preventDefault();
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        audioChunks = [];
        mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
        mediaRecorder.onstop = enviarAudioFirebase;
        mediaRecorder.start();
        btnAudio.style.color = "#ff4b4b";
        if(navigator.vibrate) navigator.vibrate(50);
    };

    // Parar ao soltar o dedo
    btnAudio.onpointerup = () => {
        if(mediaRecorder) {
            mediaRecorder.stop();
            btnAudio.style.color = "var(--vibe-blue)";
        }
    };
}

function enviarAudioFirebase() {
    const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
    const reader = new FileReader();
    reader.onload = (event) => {
        db.push({ 
            autor: nick, 
            audio: event.target.result, 
            tipo: 'audio', 
            data: Date.now() 
        });
    };
    reader.readAsDataURL(audioBlob);
          }
