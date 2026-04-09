// --- OIO ONE: EXPLORER ENGINE ---

function renderizarTelaExplorer() {
    const container = document.getElementById('app-container');
    
    container.innerHTML = `
        <div class="explorer-container" style="padding: 20px; animation: fadeIn 0.5s ease;">
            <header style="margin-bottom: 30px;">
                <h2 style="color: #2da1f8; font-size: 24px;">Vibe Explorer</h2>
                <p style="color: gray; font-size: 14px;">Descubra novas experiências</p>
            </header>

            <div class="grid-explorer" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
                
                <div class="item-exp" onclick="abrirModulo('videos')" style="text-align: center;">
                    <div style="background: rgba(255, 0, 80, 0.1); padding: 20px; border-radius: 18px; margin-bottom: 8px; border: 1px solid rgba(255, 0, 80, 0.2);">
                        <i class="fa-solid fa-play" style="color: #ff0050; font-size: 24px;"></i>
                    </div>
                    <span style="color: white; font-size: 12px;">Toc Vídeos</span>
                </div>

                <div class="item-exp" onclick="abrirModulo('nostalgia')" style="text-align: center;">
                    <div style="background: rgba(255, 152, 0, 0.1); padding: 20px; border-radius: 18px; margin-bottom: 8px; border: 1px solid rgba(255, 152, 0, 0.2);">
                        <i class="fa-solid fa-film" style="color: #ff9800; font-size: 24px;"></i>
                    </div>
                    <span style="color: white; font-size: 12px;">Nostalgia</span>
                </div>

                <div class="item-exp" onclick="abrirModulo('jogos')" style="text-align: center;">
                    <div style="background: rgba(40, 167, 69, 0.1); padding: 20px; border-radius: 18px; margin-bottom: 8px; border: 1px solid rgba(40, 167, 69, 0.2);">
                        <i class="fa-solid fa-gamepad" style="color: #28a745; font-size: 24px;"></i>
                    </div>
                    <span style="color: white; font-size: 12px;">Jogos</span>
                </div>

                <div class="item-exp" onclick="window.open('https://google.com', '_blank')" style="text-align: center;">
                    <div style="background: rgba(45, 161, 248, 0.1); padding: 20px; border-radius: 18px; margin-bottom: 8px; border: 1px solid rgba(45, 161, 248, 0.2);">
                        <i class="fa-brands fa-google" style="color: #4285F4; font-size: 24px;"></i>
                    </div>
                    <span style="color: white; font-size: 12px;">Busca</span>
                </div>

            </div>
        </div>
    `;
}

function abrirModulo(nome) {
    if (navigator.vibrate) navigator.vibrate(30);
    console.log("Abrindo: " + nome);
    // Lógica para abrir os sub-apps aqui
}
