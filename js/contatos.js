// --- OIO ONE: MÓDULO CONTATOS ---

function renderizarTelaContatos() {
    const container = document.getElementById('app-container');
    
    container.innerHTML = `
        <div style="padding: 15px;">
            <h3 style="color: #2da1f8; margin-bottom: 20px;">Contatos</h3>
            
            <div id="lista-contatos-vibe">
                <div style="display: flex; align-items: center; background: #1e2a3a; padding: 12px; border-radius: 10px; margin-bottom: 10px;">
                    <div style="width: 45px; height: 45px; border-radius: 50%; background: #2da1f8; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; margin-right: 15px;">
                        M
                    </div>
                    <div>
                        <p style="color: white; margin: 0; font-weight: bold;">Michel Detilli</p>
                        <p style="color: gray; margin: 0; font-size: 12px;">Desenvolvedor</p>
                    </div>
                </div>

                <p id="msg-vazio" style="text-align: center; color: gray; margin-top: 20px; display: none;">
                    Nenhum contato encontrado ainda...
                </p>
            </div>
        </div>
    `;
}
