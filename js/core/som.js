// --- OIO ONE: LÓGICA DE CHATS REAL-TIME ---

let primeiraCargaChat = true; // Trava para não tocar som de todas as msgs antigas

function renderizarTelaChats() {
    const container = document.getElementById('app-container');
    
    // 1. Estrutura Visual
    container.innerHTML = `
        <div class="header-vibe" style="padding: 15px; background: rgba(13, 20, 24, 0.8); backdrop-filter: blur(10px); position: sticky; top: 0; z-index: 100;">
            <h3 style="color: #2da1f8; margin: 0; font-weight: 800; letter-spacing: 1px;">VIBE CHAT</h3>
        </div>

        <div id="container-stories-vibe">
            ${typeof renderStoriesBar === 'function' ? renderStoriesBar() : ''}
        </div>

        <div id="lista-conversas" style="padding: 10px; padding-bottom: 80px; overflow-y: auto; height: calc(100vh - 200px);">
            <p style="text-align: center; color: gray; margin-top: 30px;" id="status-loading">
                <i class="fa-solid fa-spinner fa-spin" style="margin-right: 10px;"></i> Conectando...
            </p>
        </div>
    `;

    if (typeof carregarStories === 'function') carregarStories();
    
    // 2. CONEXÃO REAL COM FIREBASE
    escutarMensagensNoFirebase();
}

function escutarMensagensNoFirebase() {
    const lista = document.getElementById('lista-conversas');

    firebase.database().ref("mensagens").on("value", (snapshot) => {
        const dados = snapshot.val();
        
        // Se houver novas mensagens e não for a primeira carga, toca o som do som.js
        if (!primeiraCargaChat && window.OioSom) {
            window.OioSom.notificacao();
            if (navigator.vibrate) navigator.vibrate(40);
        }
        
        primeiraCargaChat = false; // Após a primeira leitura, libera o som para as próximas

        if (!dados) {
            lista.innerHTML = '<p style="text-align:center; color:gray; margin-top:20px;">Nenhuma conversa iniciada.</p>';
            return;
        }

        // Renderiza as mensagens
        lista.innerHTML = ""; 
        Object.keys(dados).forEach(id => {
            const m = dados[id];
            lista.innerHTML += `
                <div class="chat-item" onclick="abrirConversa('${m.autor}')" style="display: flex; align-items: center; gap: 15px; padding: 15px; background: rgba(30, 42, 58, 0.3); border-radius: 15px; margin-bottom: 10px; border: 1px solid rgba(45, 161, 248, 0.05);">
                    <div style="width: 50px; height: 50px; border-radius: 50%; background: #2da1f8; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
                        ${m.autor ? m.autor.charAt(0).toUpperCase() : '?'}
                    </div>
                    <div style="flex: 1;">
                        <h4 style="color: white; margin: 0;">${m.autor}</h4>
                        <p style="color: gray; margin: 5px 0 0 0; font-size: 13px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                            ${m.texto}
                        </p>
                    </div>
                </div>
            `;
        });
        
        // Rola para a última mensagem
        lista.scrollTop = lista.scrollHeight;
    });
}
