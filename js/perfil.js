// --- OIO ONE: PERFIL (ESTILO FACEBOOK) ---

function renderPerfilFacebook() {
    const nick = localStorage.getItem("vibe_user") || "Usuário";
    const container = document.getElementById('app-container');
    
    container.innerHTML = `
        <div class="perfil-banner">
            <div style="position:absolute; bottom:10px; right:10px; background:rgba(0,0,0,0.5); padding:5px 10px; border-radius:5px; font-size:12px;">
                <i class="fa-solid fa-camera"></i> Editar Capa
            </div>
            <div class="perfil-avatar-container">
                <img src="https://ui-avatars.com/api/?name=${nick}&background=random" class="perfil-avatar">
            </div>
        </div>

        <div style="margin-top:60px; padding:0 20px;">
            <h2 style="margin:0;">${nick}</h2>
            <p style="color:var(--vibe-gray); margin:5px 0;">Digital Creator | OIO ONE Team</p>
            
            <div style="display:flex; gap:10px; margin-top:15px;">
                <button class="btn-primary" style="flex:4; background:var(--vibe-blue); border:none; padding:10px; border-radius:8px; color:white; font-weight:bold;">
                    <i class="fa-solid fa-plus"></i> Adicionar ao Story
                </button>
                <button style="flex:1; background:var(--vibe-card); border:none; border-radius:8px; color:white;">
                    <i class="fa-solid fa-ellipsis"></i>
                </button>
            </div>
        </div>

        <div style="padding:20px; border-top: 1px solid var(--glass); margin-top:20px;">
            <h4 style="margin-bottom:15px;">Detalhes</h4>
            <div style="display:flex; flex-direction:column; gap:10px; color:var(--vibe-gray);">
                <div><i class="fa-solid fa-briefcase"></i> Desenvolvedor Mobile</div>
                <div><i class="fa-solid fa-house"></i> Mora em São Paulo</div>
                <div><i class="fa-solid fa-clock"></i> Entrou em Março de 2026</div>
            </div>
        </div>
    `;
}

