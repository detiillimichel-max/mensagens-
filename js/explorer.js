// --- OIO ONE: MÓDULO EXPLORER ---

function renderizarTelaExplorer() {
    const container = document.getElementById('app-container');
    
    container.innerHTML = `
        <div style="padding: 15px;">
            <h3 style="color: #2da1f8; margin-bottom: 20px;">e-Hub OIO ONE</h3>
            
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">
                <div class="card-explorer" onclick="abrirModulo('galeria')" style="background: #1e2a3a; padding: 15px; border-radius: 12px; text-align: center;">
                    <i class="fa-solid fa-image" style="font-size: 24px; color: #2da1f8;"></i>
                    <p style="color: white; font-size: 12px; margin-top: 8px;">Galeria</p>
                </div>

                <div class="card-explorer" onclick="window.open('https://google.com', '_blank')" style="background: #1e2a3a; padding: 15px; border-radius: 12px; text-align: center;">
                    <i class="fa-brands fa-google" style="font-size: 24px; color: #2da1f8;"></i>
                    <p style="color: white; font-size: 12px; margin-top: 8px;">Google</p>
                </div>

                <div class="card-explorer" onclick="abrirModulo('videos')" style="background: #1e2a3a; padding: 15px; border-radius: 12px; text-align: center;">
                    <i class="fa-solid fa-video" style="font-size: 24px; color: #2da1f8;"></i>
                    <p style="color: white; font-size: 12px; margin-top: 8px;">Toc Vídeos</p>
                </div>

                <div class="card-explorer" onclick="abrirModulo('jogos')" style="background: #1e2a3a; padding: 15px; border-radius: 12px; text-align: center;">
                    <i class="fa-solid fa-gamepad" style="font-size: 24px; color: #2da1f8;"></i>
                    <p style="color: white; font-size: 12px; margin-top: 8px;">Jogos</p>
                </div>

                <div class="card-explorer" style="background: #1e2a3a; padding: 15px; border-radius: 12px; text-align: center;">
                    <i class="fa-solid fa-city" style="font-size: 24px; color: #2da1f8;"></i>
                    <p style="color: white; font-size: 12px; margin-top: 8px;">BJ Perdões</p>
                </div>

                <div class="card-explorer" style="background: #1e2a3a; padding: 15px; border-radius: 12px; text-align: center;">
                    <i class="fa-solid fa-tv" style="font-size: 24px; color: #2da1f8;"></i>
                    <p style="color: white; font-size: 12px; margin-top: 8px;">Nostalgia</p>
                </div>
            </div>
        </div>
    `;
}

function abrirModulo(tipo) {
    console.log("Abrindo módulo:", tipo);
    // Aqui você pode adicionar as rotas para cada sub-módulo
}
