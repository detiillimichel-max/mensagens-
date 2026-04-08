// --- OIO ONE: EXPLORER (TIKTOK + NOSTALGIA + JOGOS) ---

function renderExplorer() {
    const container = document.getElementById('app-container');
    container.innerHTML = `
        <div class="feed-tiktok" id="feed-videos">
            <div style="padding:100px 20px; text-align:center;">
                <i class="fa-solid fa-play-circle" style="font-size:50px; color:var(--vibe-blue);"></i>
                <p>Deslize para ver os vídeos</p>
            </div>
        </div>

        <div style="position:fixed; bottom:90px; right:20px; z-index:100;">
            <button onclick="document.getElementById('videoInput').click()" style="width:60px; height:60px; border-radius:50%; border:none; background:var(--vibe-blue); color:white; font-size:24px; box-shadow: 0 4px 15px rgba(0,0,0,0.4);">
                <i class="fa-solid fa-plus"></i>
            </button>
        </div>
    `;
}

// Função para o "Toc Vídeos" (Estilo TikTok)
function carregarVideosFeed() {
    const feed = document.getElementById('feed-videos');
    // Exemplo de como um vídeo de domínio público aparece sem URL visível
    const videoHTML = `
        <div class="video-card">
            <video loop onclick="this.paused ? this.play() : this.pause()" style="width:100%; height:100%; object-fit:cover;">
                <source src="URL_DO_VIDEO_AQUI" type="video/mp4">
            </video>
            <div class="video-ui">
                <i class="fa-solid fa-heart"></i>
                <i class="fa-solid fa-comment"></i>
                <i class="fa-solid fa-share"></i>
            </div>
            <div style="position:absolute; bottom:20px; left:15px; color:white;">
                <strong>@michel_dev</strong>
                <p>Testando o novo Toc Vídeos OIO ONE! 🚀</p>
            </div>
        </div>
    `;
    feed.innerHTML = videoHTML; 
}

// Função Nostalgia (Desenhos Antigos)
function abrirNostalgia() {
    const container = document.getElementById('app-container');
    container.innerHTML = `
        <div class="topo-simples" style="padding:20px;">
            <i class="fa-solid fa-arrow-left" onclick="navegar('chats')"></i>
            <h3 style="display:inline; margin-left:15px;">Nostalgia OIO</h3>
        </div>
        <div style="padding:15px; display:grid; grid-template-columns:1fr 1fr; gap:10px;">
            <div class="card-desenho" onclick="playDesenho('ID_VIDEO')">
                <img src="assets/thumb_desenho.jpg" style="width:100%; border-radius:10px;">
                <p>Popeye (1930)</p>
            </div>
        </div>
    `;
}

