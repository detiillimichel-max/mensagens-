// --- OIO ONE: LÓGICA DO PERFIL ---

function renderizarTelaPerfil() {
    const container = document.getElementById('app-container');
    
    // Tenta buscar os dados salvos no celular do usuário
    const nomeUsuario = localStorage.getItem("vibe_user");
    const telefoneUsuario = localStorage.getItem("vibe_tel");

    // Se o usuário não tiver dados salvos (como o celular do seu amigo)
    if (!nomeUsuario) {
        container.innerHTML = `
            <div style="padding: 20px; text-align: center; color: white; margin-top: 50px;">
                <i class="fa-solid fa-user-circle" style="font-size: 60px; color: #2da1f8; margin-bottom: 20px;"></i>
                <h2>Bem-vindo ao Vibe OIO</h2>
                <p style="color: gray; margin-top: 10px;">Você precisa configurar seu perfil para começar.</p>
                <button onclick="iniciarConfiguracaoPerfil()" style="margin-top: 20px; padding: 10px 20px; background: #2da1f8; color: white; border: none; border-radius: 8px; font-weight: bold;">
                    Configurar Perfil
                </button>
            </div>
        `;
        return;
    }

    // Se o usuário tiver dados (como no seu celular)
    container.innerHTML = `
        <div class="perfil-header" style="padding: 20px; text-align: center; border-bottom: 1px solid #1e2a3a;">
            <div style="width: 80px; height: 80px; border-radius: 50%; background: #2da1f8; margin: 0 auto; display: flex; align-items: center; justify-content: center; font-size: 30px; color: white; border: 2px solid white;">
                ${nomeUsuario.charAt(0).toUpperCase()}
            </div>
            <h2 style="color: white; margin-top: 15px;">${nomeUsuario}</h2>
            <p style="color: #2da1f8;">Online</p>
        </div>
        <div class="perfil-body" style="padding: 20px;">
            <div style="background: #1e2a3a; padding: 15px; border-radius: 10px; margin-bottom: 10px;">
                <small style="color: gray;">Telefone / Contato</small>
                <p style="color: white; margin: 5px 0 0 0;">${telefoneUsuario || "Não informado"}</p>
            </div>
            <button style="width: 100%; padding: 15px; background: #ff0050; color: white; border: none; border-radius: 10px; font-weight: bold; margin-top: 20px;">
                Sair / Deslogar
            </button>
        </div>
    `;
}

function iniciarConfiguracaoPerfil() {
    // Uma função simples para o usuário novo salvar o nome dele
    const nome = prompt("Digite seu nome de usuário:");
    if (nome) {
        localStorage.setItem("vibe_user", nome);
        renderizarTelaPerfil(); // Recarrega a tela na hora
    }
}
