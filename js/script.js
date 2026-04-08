/* OIO ONE - SCRIPT UNIFICADO: CHAT FUNCIONAL E NAVEGAÇÃO */

// 1. Verificação de Segurança (Login)
let nick = localStorage.getItem("vibe_user");
if (!nick) {
    window.location.href = "login.html";
}

// 2. Configuração do Firebase (A MESMA DO SEU CÓDIGO ATUAL)
const firebaseConfig = {
    apiKey: "AIzaSyAslIIn6h6NdVhuHdwXjS1EhAbItrAXq7Y",
    databaseURL: "https://vibe-app-bbba2-default-rtdb.firebaseio.com/",
    projectId: "vibe-app-bbba2"
};
if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }
const db = firebase.database().ref("chat_vibe");

// 3. Som e Recebimento
const somPlim = new Audio('assets/sounds/vibe.mp3');
const somClique = new Audio('assets/sounds/clique.mp3'); // Se tiver, se não, use o de 'mensagem' fallback

let primeiraVez = true;

db.limitToLast(20).on("child_added", snap => {
    const m = snap.val();
    const chat = document.getElementById("chat");
    if(!chat) return;

    const div = document.createElement("div");
    div.className = "balao";
    div.style.alignSelf = m.autor === nick ? "flex-end" : "flex-start";

    let avatarFallback = `https://ui-avatars.com/api/?name=${m.autor}&background=1a73e8&color=fff&rounded=true`;
    let topo = `<div style="display:flex; align-items:center; gap:8px; margin-bottom:5px;">
                    <img src="assets/users/${m.autor.toLowerCase()}.jpg" onerror="this.src='${avatarFallback}'" style="width:25px; height:25px; border-radius:50%;">
                    <strong style="font-size:12px; color:#2da1f8;">${m.autor}</strong>
                </div>`;

    if (m.tipo === 'foto') {
        div.innerHTML = topo + `<img src="${m.imagem}" style="width:100%; border-radius:10px;">`;
    } else if (m.tipo === 'audio') {
        div.innerHTML = topo + `<audio controls src="${m.audio}" style="width:100%;"></audio>`;
    } else {
        div.innerHTML = topo + `<span>${m.texto}</span>`;
    }

    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;

    // Notifica apenas mensagens de outros usuários e ignora o carregamento inicial
    if (m.autor !== nick && !primeiraVez) {
        somPlim.play().catch(() => {});
        if (typeof window.notificarVibe === 'function') {
            window.notificarVibe('Vibe Mensagens 💬', m.autor + ': ' + (m.texto || (m.tipo === 'foto' ? '📷 Foto' : '🎤 Áudio')));
        }
    }
});

// Marca que o carregamento inicial terminou
setTimeout(() => { primeiraVez = false; }, 2000);

// 4. Funções de Envio
function enviar() {
    const input = document.getElementById('msgInput');
    if (input && input.value.trim() !== "") {
        db.push({ autor: nick, texto: input.value, tipo: 'texto', data: Date.now() });
        input.value = "";
    }
}
document.getElementById('btnEnviar').onclick = enviar;

// Enviar com ENTER
document.getElementById('msgInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') enviar();
});

const btnFoto = document.getElementById('btnFoto');
const fotoInput = document.getElementById('fotoInput');
if(btnFoto) btnFoto.onclick = () => fotoInput.click();
fotoInput.onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => { db.push({ autor: nick, imagem: event.target.result, tipo: 'foto', data: Date.now() }); };
        reader.readAsDataURL(file);
    }
};

let mediaRecorder; let audioChunks = [];
const btnAudio = document.getElementById('btnAudio');
if(btnAudio) btnAudio.onclick = async () => {
    if (!mediaRecorder || mediaRecorder.state === "inactive") {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        audioChunks = [];
        mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
            const reader = new FileReader();
            reader.onload = (event) => { db.push({ autor: nick, audio: event.target.result, tipo: 'audio', data: Date.now() }); };
            reader.readAsDataURL(audioBlob);
        };
        mediaRecorder.start(); btnAudio.style.color = "red"; 
    } else { mediaRecorder.stop(); btnAudio.style.color = "#2da1f8"; }
};

// ================= LÓGICA DE GAVETA E NAVEGAÇÃO =================

// Controle da Gaveta e-Hub (RESTAURADA)
function abrirGaveta() { 
    document.getElementById('gaveta-ehub').classList.add('aberta'); 
    if(navigator.vibrate) navigator.vibrate(30);
}
function fecharGaveta() { document.getElementById('gaveta-ehub').classList.remove('aberta'); }

// Som de clique e vibração global
function somVibraClique() {
    if(somClique) somClique.play().catch(() => {});
    if(navigator.vibrate) navigator.vibrate(20);
}

// Nova Função de Navegação do App (PARA AS 5 ABAS)
function navegarApp(tabName) {
    somVibraClique();

    // 1. Esconde todas as seções ocultas
    const panels = document.querySelectorAll('.view-panel');
    panels.forEach(panel => panel.classList.remove('active'));

    // 2. Desativa o estado 'active' de todos os itens do menu inferior
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));

    // 3. Mostra ou esconde a visualização do chat
    const chatView = document.getElementById('app-view');
    if (tabName === 'Chats') {
        chatView.style.display = 'flex';
        document.getElementById('nav-chats').classList.add('active');
    } else {
        chatView.style.display = 'none';
        // Remove 'active' do Chat se estiver em outra aba
        document.getElementById('nav-chats').classList.remove('active');
    }

    // 4. Se for "Explorar", abre a gaveta funcional que já existia
    if (tabName === 'Explorar') {
        abrirGaveta();
        // Mantém 'Explorar' como ativo no menu
        document.getElementById('nav-explorar').classList.add('active');
    }

    // 5. Se forem as novas abas, mostra o painel correspondente e imita o layout das fotos
    if (tabName === 'Contacts') {
        document.getElementById('tab-contacts').classList.add('active');
        document.getElementById('nav-contacts').classList.add('active');
        // Fallback: Você pode imitar a lista de contatos aqui ou carregar via JS
        document.querySelector('#tab-contacts .list-container').innerHTML = `<p style="padding: 20px; color: #888;">Nenhum contato encontrado ainda...</p>`;
    }

    if (tabName === 'Podcasts') {
        document.getElementById('tab-podcasts').classList.add('active');
        document.getElementById('nav-podcasts').classList.add('active');
        // Fallback: Imitar a lista de áudios
        document.querySelector('#tab-podcasts .list-container').innerHTML = `<p style="padding: 20px; color: #888;">Nenhum áudio salvo ainda...</p>`;
    }

    if (tabName === 'Perfil') {
        document.getElementById('tab-perfil').classList.add('active');
        document.getElementById('nav-perfil').classList.add('active');
        // Fallback: Imitar o perfil da foto 2
        document.querySelector('#tab-perfil .list-container').innerHTML = `
            <div style="padding: 20px; text-align: center;">
                <img src="${avatarFallback}" style="width: 80px; height: 80px; border-radius: 50%; border: 3px solid #2da1f8; margin-bottom: 15px;">
                <h4>${nick}</h4>
                <p style="color: #888; font-size: 12px;">Seu Perfil OIO</p>
                <button style="background: transparent; border: 1px solid #1a73e8; color: #1a73e8; padding: 6px 15px; border-radius: 6px; font-size: 12px; margin-top: 10px;">Ajustes</button>
            </div>`;
    }
}
