// --- OIO ONE: GERENCIADOR DE TELAS CENTRAL ---

const appContainer = document.getElementById('app-container');

function navegar(tela) {
    if(navigator.vibrate) navigator.vibrate(20);
    
    // Fecha o explorer se ele estiver aberto ao navegar
    if(typeof fecharExplorer === 'function') fecharExplorer();

    switch(tela) {
        case 'chats':
            if (typeof renderizarTelaChats === 'function') {
                renderizarTelaChats();
            } else {
                renderChatsFallback();
            }
            break;
        case 'perfil':
            if (typeof renderizarTelaPerfil === 'function') {
                renderizarTelaPerfil();
            } else {
                renderPerfilFallback();
            }
            break;
        case 'explorer':
            // A lógica de abrir o explorer já está no nav.js
            break;
    }
}

// Fallback caso o módulo de perfil não carregue
function renderPerfilFallback() {
    const nick = localStorage.getItem("vibe_user") || "Usuário Vibe";
    appContainer.innerHTML = `
        <div style="padding:20px; text-align:center;">
            <img src="https://ui-avatars.com/api/?name=${nick}" style="border-radius:50%; width:100px;">
            <h2>${nick}</h2>
            <p>Módulo de perfil em carregamento...</p>
        </div>
    `;
}

// Fallback caso o módulo de chat não carregue
function renderChatsFallback() {
    appContainer.innerHTML = `<div style="padding:20px; text-align:center;"><h3>Carregando Mensagens...</h3></div>`;
}

// Inicia na tela de chats ao carregar
document.addEventListener('DOMContentLoaded', () => navegar('chats'));
