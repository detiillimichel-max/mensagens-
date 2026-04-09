// --- OIO ONE: MÓDULO DE PODCASTS PREMIUM ---

export function renderizarTelaPodcasts() {
    const appContainer = document.getElementById('app-container');
    
    // 1. Estrutura da Tela
    appContainer.innerHTML = `
        <div class="header-vibe" style="padding: 15px; position: sticky; top: 0; z-index: 100; background: rgba(0,0,0,0.8); backdrop-filter: blur(10px);">
            <h3 style="color: #2da1f8; margin: 0; font-weight: 800;">PODCASTS</h3>
        </div>

        <div id="lista-podcasts" style="padding: 15px; padding-bottom: 90px;">
            ${gerarCardPodcast("Pílula de Voz #1", "Michel Max", "05:00 min", "30%")}
            ${gerarCardPodcast("OIO ONE Vision", "Equipe OIO", "12:30 min", "0%")}
        </div>
    `;
}

// 2. Função que gera o HTML do Card (Baseado no seu snippet)
function gerarCardPodcast(titulo, autor, tempo, progresso) {
    return `
        <div class="glass-card podcast-item fade-in">
            <div class="pod-cover">
                <i class="fas fa-microphone-alt"></i>
            </div>
            <div class="pod-details">
                <h4 class="pod-title">${titulo}</h4>
                <p class="pod-meta">${autor} • ${tempo}</p>
                <div class="pod-progress-bar">
                    <div class="progress-fill" style="width: ${progresso};"></div>
                </div>
            </div>
            <div class="pod-action" onclick="playPodcast('${titulo}')">
                <i class="fas fa-play-circle"></i>
            </div>
        </div>
    `;
}

// 3. Lógica de Play
window.playPodcast = (titulo) => {
    console.log("Tocando:", titulo);
    if(navigator.vibrate) navigator.vibrate(30);
    // Adicione aqui a lógica para abrir o player real
};

