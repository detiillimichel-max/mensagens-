// CONFIGURAÇÃO
let nick = localStorage.getItem("vibe_user") || "Michel_Dev";
const firebaseConfig = {
    apiKey: "AIzaSyAslIIn6h6NdVhuHdwXjS1EhAbItrAXq7Y",
    databaseURL: "https://vibe-app-bbba2-default-rtdb.firebaseio.com/",
    projectId: "vibe-app-bbba2"
};
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref("chat_vibe");

// NAVEGAÇÃO
function navegarApp(tab) {
    if(tab === 'Explorar') return abrirGaveta();
    
    document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    
    const target = document.getElementById('tab-' + tab.toLowerCase());
    if(target) target.classList.add('active');
    
    // Atualiza as telas dinâmicas
    if(tab === 'Perfil') renderizarPerfil();
    if(tab === 'Contacts') renderizarContatos();
}

function abrirConversa(nome) {
    document.getElementById('lista-conversas').style.display = 'none';
    document.getElementById('chat-ativo').style.display = 'flex';
    document.getElementById('chat-nome-usuario').innerText = nome;
    document.getElementById('chat-avatar').src = `https://ui-avatars.com/api/?name=${nome}&background=1a73e8&color=fff&rounded=true`;
    document.querySelector('.bottom-nav').style.display = 'none';
}

function voltarParaLista() {
    document.getElementById('lista-conversas').style.display = 'block';
    document.getElementById('chat-ativo').style.display = 'none';
    document.querySelector('.bottom-nav').style.display = 'flex';
}

function abrirGaveta() { document.getElementById('gaveta-ehub').classList.add('aberta'); }
function fecharGaveta() { document.getElementById('gaveta-ehub').classList.remove('aberta'); }

// FIREBASE LISTENER (LISTA DE CHATS)
db.on("child_added", snap => {
    const m = snap.val();
    const lista = document.getElementById("contatos-recentes");
    if(!document.getElementById(`item-${m.autor}`)) {
        const div = document.createElement("div");
        div.className = "conversa-item";
        div.id = `item-${m.autor}`;
        div.onclick = () => abrirConversa(m.autor);
        div.innerHTML = `
            <img src="https://ui-avatars.com/api/?name=${m.autor}&background=2d3b45&color=fff&rounded=true" style="width:50px; border-radius:50%;">
            <div class="conversa-info"><h4>${m.autor}</h4><p>${m.texto || "📷 Foto"}</p></div>
        `;
        lista.prepend(div);
    }
});

// RENDERIZAR TELAS
function renderizarPerfil() {
    document.getElementById('perfil-render').innerHTML = `
        <div style="text-align:center; padding:20px;">
            <img src="https://ui-avatars.com/api/?name=${nick}&background=1a73e8&color=fff&size=128" style="width:100px; border-radius:50%; border:3px solid #2da1f8;">
            <h2 style="color:white; margin-top:10px;">${nick}</h2>
            <p style="color:#627b8f;">Desenvolvedor OIO ONE</p>
        </div>
    `;
}
