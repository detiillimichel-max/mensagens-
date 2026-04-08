// --- OIO ONE: LÓGICA DE CHATS ---

function renderizarTelaChats() {
    const container = document.getElementById('app-container');
    
    // 1. Renderiza a estrutura (Barra de Stories + Lista de Mensagens)
    container.innerHTML = `
        <div class="header-vibe" style="padding: 15px; background: rgba(13, 20, 24, 0.8); backdrop-filter: blur(10px); sticky; top: 0; z-index: 100;">
            <h3 style="color: #2da1f8; margin: 0; font-weight: 800; letter-spacing: 1px;">VIBE CHAT</h3>
        </div>

        <div id="container-stories-vibe">
            ${typeof renderStoriesBar === 'function' ? renderStoriesBar() : ''}
        </div>

        <div id="lista-conversas" style="padding: 10px; padding-bottom: 80px;">
            <p style="text-align: center; color: gray; margin-top: 30px;">
                <i class="fa-solid fa-spinner fa-spin" style="margin-right: 10px;"></i> Carregando conversas...
            </p>
        </div>
    `;

    // 2. Ativa os Stories e carrega as mensagens
    if (typeof carregarStories === 'function') carregarStories();
    
    // Simulação de lista de chat (Aqui você conectará com seu Firebase mensagens)
    setTimeout(() => {
        const lista = document.getElementById('lista-conversas');
        if(lista) {
            lista.innerHTML = `
                <div class="chat-item" onclick="abrirConversa('Bibibi')" style="display: flex; align-items: center; gap: 15px; padding: 15px; background: rgba(30, 42, 58, 0.3); border-radius: 15px; margin-bottom: 10px; border: 1px solid rgba(45, 161, 248, 0.05);">
                    <div style="width: 50px; height: 50px; border-radius: 50%; background: #ff0050; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">B</div>
                    <div style="flex: 1;">
                        <h4 style="color: white; margin: 0;">Bibibi</h4>
                        <p style="color: gray; margin: 5px 0 0 0; font-size: 13px;">Online</p>
                    </div>
                    <span style="color: #2da1f8; font-size: 10px;">Agora</span>
                </div>
            `;
        }
    }, 1000);
}
