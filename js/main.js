// --- OIO ONE: GERENCIADOR DE TELAS MODULAR ---

const appContainer = document.getElementById('app-container');

function navegar(tela) {
    // Vibrate para dar sensação de app nativo
    if(navigator.vibrate) navigator.vibrate(20);

    switch(tela) {
        case 'chats':
            renderChats();
            break;
        case 'perfil':
            renderPerfil();
            break;
    }
}

// RENDERIZADOR DO PERFIL (Estilo Facebook)
function renderPerfil() {
    const nick = localStorage.getItem("vibe_user") || "Usuário Vibe";
    appContainer.innerHTML = `
        <div class="perfil-banner">
            <div class="perfil-avatar-container">
                <img src="https://ui-avatars.com/api/?name=${nick}&size=128" class="perfil-avatar">
                <h2 style="margin-bottom: 10px;">${nick}</h2>
            </div>
        </div>
        
        <div class="perfil-info-topo">
            <div class="perfil-bio">🚀 Desenvolvedor Mobile na OIO ONE | Criando o futuro do entretenimento.</div>
            <div style="display:flex; gap:10px; margin-top:15px;">
                <button style="flex:1; padding:10px; border-radius:8px; border:none; background:var(--vibe-blue); color:white; font-weight:bold;">Editar Perfil</button>
                <button style="padding:10px; border-radius:8px; border:none; background:var(--vibe-card); color:white;"><i class="fa-solid fa-ellipsis"></i></button>
            </div>
        </div>

        <div style="padding:20px;">
            <h4 style="border-bottom: 1px solid var(--glass); padding-bottom:10px;">Fotos e Posts</h4>
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-top:10px;">
                <div style="height:150px; background:#333; border-radius:10px;"></div>
                <div style="height:150px; background:#333; border-radius:10px;"></div>
            </div>
        </div>
    `;
}

// RENDERIZADOR DA LISTA DE CHATS (Estilo WhatsApp)
function renderChats() {
    appContainer.innerHTML = `
        <div class="topo-simples" style="padding:20px;">
            <h3>WhatsApp Vibe</h3>
        </div>
        <div id="lista-conversas">
            <div style="padding:40px; text-align:center; color:var(--vibe-gray);">Carregando mensagens...</div>
        </div>
    `;
    // Aqui chamaremos a função de carregar do Firebase que já temos
}

// Inicia na tela de chats
document.addEventListener('DOMContentLoaded', () => navegar('chats'));
