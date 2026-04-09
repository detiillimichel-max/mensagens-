// --- OIO ONE: PROFILE ENGINE ---

function renderizarTelaPerfil() {
    const container = document.getElementById('app-container');
    const nome = localStorage.getItem("vibe_user") || "Michel";

    container.innerHTML = `
        <div class="perfil-screen" style="animation: slideUp 0.4s ease;">
            <div class="capa" style="height: 160px; background: linear-gradient(45deg, #0d1418, #2da1f8); position: relative;">
                <div class="avatar-perfil" style="width: 100px; height: 100px; border-radius: 50%; background: #2da1f8; border: 4px solid #0d1418; position: absolute; bottom: -50px; left: 20px; display: flex; align-items: center; justify-content: center; font-size: 40px; color: white; font-weight: bold;">
                    ${nome.charAt(0).toUpperCase()}
                </div>
            </div>

            <div class="info-user" style="margin-top: 60px; padding: 0 20px;">
                <h2 style="color: white; margin: 0;">${nome}</h2>
                <p style="color: #2da1f8; margin: 5px 0;">@oio_one_developer</p>
                
                <div class="stats" style="display: flex; gap: 20px; margin-top: 20px; border-top: 1px solid #1e2a3a; padding-top: 20px;">
                    <div style="text-align: center;"><b style="color: white; display: block;">120</b><small style="color: gray;">Seguidores</small></div>
                    <div style="text-align: center;"><b style="color: white; display: block;">85</b><small style="color: gray;">Posts</small></div>
                </div>

                <button style="width: 100%; margin-top: 30px; padding: 12px; border-radius: 12px; background: #2da1f8; color: white; border: none; font-weight: bold;">
                    Editar Perfil Profissional
                </button>
            </div>
        </div>
    `;
}
