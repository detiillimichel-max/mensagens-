/* OIO ONE - SCRIPT UNIFICADO: CHAT, EXPLORER, CONTATOS E PERFIL */

// ================= 1. SEGURANÇA E CONFIGURAÇÃO =================
let nick = localStorage.getItem("vibe_user");
if (!nick) {
    window.location.href = "login.html";
}

const firebaseConfig = {
    apiKey: "AIzaSyAslIIn6h6NdVhuHdwXjS1EhAbItrAXq7Y",
    databaseURL: "https://vibe-app-bbba2-default-rtdb.firebaseio.com/",
    projectId: "vibe-app-bbba2"
};
if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }
const db = firebase.database().ref("chat_vibe");

const somPlim = new Audio('assets/sounds/vibe.mp3');
const somClique = new Audio('assets/sounds/clique.mp3');
let primeiraVez = true;

// Lista para armazenar usuários únicos que interagiram no app (para a tela de perfil)
let usuariosConhecidos = new Set();
usuariosConhecidos.add(nick); // Já adiciona você mesmo

// ================= 2. LÓGICA DO CHAT =================
db.limitToLast(20).on("child_added", snap => {
    const m = snap.val();
    const chat = document.getElementById("chat");
    if(!chat) return;

    // Registra o usuário que mandou a mensagem na nossa lista de conhecidos
    if(m.autor) usuariosConhecidos.add(m.autor);

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

    if (m.autor !== nick && !primeiraVez) {
        somPlim.play().catch(() => {});
        if (typeof window.notificarVibe === 'function') {
            window.notificarVibe('Vibe Mensagens 💬', m.autor + ': ' + (m.texto || (m.tipo === 'foto' ? '📷 Foto' : '🎤 Áudio')));
        }
    }
});

setTimeout(() => { primeiraVez = false; }, 2000);

// ================= 3. FUNÇÕES DE ENVIO =================
function enviar() {
    const input = document.getElementById('msgInput');
    if (input && input.value.trim() !== "") {
        db.push({ autor: nick, texto: input.value, tipo: 'texto', data: Date.now() });
        input.value = "";
    }
}
document.getElementById('btnEnviar').onclick = enviar;
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


// ================= 4. AÇÕES DA GAVETA EXPLORER (e-Hub) =================
function abrirGaveta() { 
    document.getElementById('gaveta-ehub').classList.add('aberta'); 
    if(navigator.vibrate) navigator.vibrate(30);
}
function fecharGaveta() { document.getElementById('gaveta-ehub').classList.remove('aberta'); }

// Funções para os ícones da gaveta funcionarem
function abrirAppHub(app) {
    somVibraClique();
    switch(app) {
        case 'google':
            window.open('https://www.google.com', '_blank');
            break;
        case 'toc_azul':
            // Se você tiver uma página de vídeos, coloque o link aqui
            alert("Módulo Toc Vídeos em desenvolvimento.");
            break;
        case 'jogos':
            alert("Módulo Jogos em desenvolvimento.");
            break;
        case 'prefeitura':
            alert("Módulo BJ Perdões (Prefeitura Hub) em desenvolvimento.");
            break;
        case 'nostalgia':
            alert("Módulo Nostalgia em desenvolvimento.");
            break;
    }
}

function galeriaHub() {
    somVibraClique();
    // Reutiliza o input de foto do chat para agir como galeria no e-Hub
    document.getElementById('fotoInput').click();
}


// ================= 5. LÓGICA DE CONTATOS E PERFIL =================

async function puxarEConvidarContato() {
    somVibraClique();
    const props = ['name', 'tel'];
    const opts = { multiple: false };
    
    try {
        // Verifica se o celular do usuário suporta a API de Contatos
        if ('contacts' in navigator && 'ContactsManager' in window) {
            const contacts = await navigator.contacts.select(props, opts);
            if (contacts.length > 0 && contacts[0].tel.length > 0) {
                const numero = contacts[0].tel[0];
                const nomeContato = contacts[0].name[0] || "amigo";
                const mensagem = `Olá ${nomeContato}! Venha conversar comigo no novo Vibe OIO ONE. Acesse: https://tiillimichel-max.github.io/vibe-app`;
                // Abre o app nativo de SMS do celular com o convite pronto
                window.open(`sms:${numero}?body=${encodeURIComponent(mensagem)}`);
            }
        } else {
            alert("A leitura nativa de contatos não é suportada por este navegador. Tente compartilhar o link diretamente!");
        }
    } catch (ex) {
        console.log("Erro ou cancelamento ao abrir contatos: ", ex);
    }
}

function renderizarTelaPerfil() {
    const container = document.querySelector('#tab-perfil .list-container');
    let avatarPrincipal = `https://ui-avatars.com/api/?name=${nick}&background=1a73e8&color=fff&rounded=true&size=128`;
    
    // Constrói o HTML do perfil logado
    let htmlPerfil = `
        <div style="padding: 30px 20px; text-align: center; border-bottom: 1px solid #1f2933;">
            <img src="${avatarPrincipal}" style="width: 100px; height: 100px; border-radius: 50%; border: 4px solid #2da1f8; box-shadow: 0 0 15px rgba(45, 161, 248, 0.3); margin-bottom: 15px;">
            <h2 style="margin: 0; color: #fff;">${nick}</h2>
            <p style="color: #2da1f8; font-size: 14px; margin-top: 5px;"><i class="fa-solid fa-circle" style="font-size: 10px;"></i> Online</p>
        </div>
        <div style="padding: 20px;">
            <h4 style="color: #627b8f; margin-bottom: 15px; font-size: 12px; text-transform: uppercase;">Outros Usuários na Rede</h4>
            <div style="display: flex; flex-direction: column; gap: 15px;">
    `;

    // Lista os outros usuários detectados no Firebase
    usuariosConhecidos.forEach(usuario => {
        if (usuario !== nick) {
            let avatarOutro = `https://ui-avatars.com/api/?name=${usuario}&background=2d3b45&color=fff&rounded=true`;
            htmlPerfil += `
                <div style="display: flex; align-items: center; gap: 15px; background: #1a242d; padding: 10px 15px; border-radius: 12px;">
                    <img src="${avatarOutro}" style="width: 40px; height: 40px; border-radius: 50%;">
                    <div style="flex: 1;">
                        <h4 style="margin: 0; color: #fff; font-size: 15px;">${usuario}</h4>
                        <span style="color: #627b8f; font-size: 12px;">Membro Vibe</span>
                    </div>
                    <i class="fa-solid fa-comment" style="color: #2da1f8; cursor: pointer;" onclick="navegarApp('Chats')"></i>
                </div>
            `;
        }
    });

    htmlPerfil += `</div></div>`;
    container.innerHTML = htmlPerfil;
}


// ================= 6. NAVEGAÇÃO PRINCIPAL (BOTTOM NAV) =================
function somVibraClique() {
    if(somClique) somClique.play().catch(() => {});
    if(navigator.vibrate) navigator.vibrate(20);
}

function navegarApp(tabName) {
    somVibraClique();

    const panels = document.querySelectorAll('.view-panel');
    panels.forEach(panel => panel.classList.remove('active'));

    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));

    const chatView = document.getElementById('app-view');
    if (tabName === 'Chats') {
        chatView.style.display = 'flex';
        document.getElementById('nav-chats').classList.add('active');
    } else {
        chatView.style.display = 'none';
        document.getElementById('nav-chats').classList.remove('active');
    }

    if (tabName === 'Explorar') {
        abrirGaveta();
        document.getElementById('nav-explorar').classList.add('active');
    }

    if (tabName === 'Contacts') {
        document.getElementById('tab-contacts').classList.add('active');
        document.getElementById('nav-contacts').classList.add('active');
        
        // Tela de contatos com botão nativo
        document.querySelector('#tab-contacts .list-container').innerHTML = `
            <div style="padding: 40px 20px; text-align: center;">
                <div style="width: 80px; height: 80px; background: rgba(45, 161, 248, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px auto;">
                    <i class="fa-solid fa-user-plus" style="font-size: 30px; color: #2da1f8;"></i>
                </div>
                <h3 style="color: #fff; margin-bottom: 10px;">Convide seus Amigos</h3>
                <p style="color: #627b8f; font-size: 14px; margin-bottom: 30px;">Acesse a agenda do seu celular e envie um convite direto por SMS.</p>
                <button onclick="puxarEConvidarContato()" style="background: #2da1f8; color: #fff; border: none; padding: 15px 30px; border-radius: 25px; font-size: 16px; font-weight: bold; width: 100%; max-width: 300px; box-shadow: 0 4px 15px rgba(45, 161, 248, 0.4);">
                    Abrir Contatos do Celular
                </button>
            </div>
        `;
    }

    if (tabName === 'Podcasts') {
        document.getElementById('tab-podcasts').classList.add('active');
        document.getElementById('nav-podcasts').classList.add('active');
        document.querySelector('#tab-podcasts .list-container').innerHTML = `
            <div style="padding: 20px; text-align: center; color: #627b8f;">
                <i class="fa-solid fa-microphone-lines" style="font-size: 40px; opacity: 0.5; margin-bottom: 15px; margin-top: 40px;"></i>
                <p>Nenhum podcast gravado ainda.</p>
            </div>`;
    }

    if (tabName === 'Perfil') {
        document.getElementById('tab-perfil').classList.add('active');
        document.getElementById('nav-perfil').classList.add('active');
        // Chama a função que constrói a tela de perfil
        renderizarTelaPerfil();
    }
}
