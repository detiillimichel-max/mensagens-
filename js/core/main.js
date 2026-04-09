// --- OIO ONE: GERENCIADOR DE TELAS CENTRAL (Versão Completa) ---

const appContainer = document.getElementById('app-container');

function navegar(tela) {
    if(navigator.vibrate) navigator.vibrate(20);
    
    // Fecha o explorer se ele estiver aberto ao navegar
    if(typeof fecharExplorer === 'function') fecharExplorer();

    // Atualiza visualmente os ícones da barra inferior
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    const itemAtivo = document.getElementById('nav-' + tela);
    if(itemAtivo) itemAtivo.classList.add('active');

    // Gerenciador de Troca de Telas
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

        case 'podcasts':
            if (typeof renderizarTelaPodcasts === 'function') {
                renderizarTelaPodcasts();
            } else {
                renderPodcastsFallback();
            }
            break;

        case 'contatos':
            if (typeof renderizarTelaContatos === 'function') {
                renderizarTelaContatos();
            } else {
                renderContatosFallback();
            }
            break;

        case 'explorar':
            // Se for explorer, abrimos a gaveta (logic em nav.js)
            if(typeof abrirExplorer === 'function') abrirExplorer();
            break;
    }
}

// --- TELAS DE SEGURANÇA (FALLBACKS) ---
// Isso evita que o app fique vazio se o módulo demorar a carregar

function renderPerfilFallback() {
    const nick = localStorage.getItem("vibe_user") || "Usuário Vibe";
    appContainer.innerHTML = `
        <div style="padding:20px; text-align:center; margin-top:50px;">
            <img src="https://ui-avatars.com/api/?name=${nick}" style="border-radius:50%; width:100px; border: 2px solid #2da1f8;">
            <h2>${nick}</h2>
            <p style="color:gray;">Carregando Perfil...</p>
        </div>
    `;
}

function renderChatsFallback() {
    appContainer.innerHTML = `
        <div style="padding:20px; text-align:center; margin-top:50px;">
            <i class="fas fa-spinner fa-spin" style="font-size:30px; color:#2da1f8;"></i>
            <h3>Carregando Mensagens...</h3>
        </div>`;
}

function renderPodcastsFallback() {
    appContainer.innerHTML = `
        <div style="padding:20px; text-align:center; margin-top:50px;">
            <i class="fas fa-microphone" style="font-size:30px; color:#2da1f8;"></i>
            <h3>Sincronizando Áudios...</h3>
        </div>`;
}

function renderContatosFallback() {
    appContainer.innerHTML = `
        <div style="padding:20px; text-align:center; margin-top:50px;">
            <i class="fas fa-users" style="font-size:30px; color:#2da1f8;"></i>
            <h3>Buscando Contatos...</h3>
        </div>`;
}

// Inicia na tela de chats ao carregar o site
document.addEventListener('DOMContentLoaded', () => navegar('chats'));
