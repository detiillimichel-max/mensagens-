/* LÓGICA DE NAVEGAÇÃO DO RODAPÉ - OIO ONE */

function navegarApp(idAba, elementoClicado) {
    // Remove o estado ativo de todos os botões do menu
    const botoesMenu = document.querySelectorAll('.nav-item');
    botoesMenu.forEach(botao => botao.classList.remove('active'));

    // Ativa o botão visualmente
    if (elementoClicado) {
        elementoClicado.classList.add('active');
    }

    // Chama a função global de navegar que está no main.js
    if (typeof navegar === 'function') {
        navegar(idAba);
    }

    // Som e Vibração
    if (window.OioSom) window.OioSom.clique();
    if (navigator.vibrate) navigator.vibrate(20);
}

// Funções para abrir as gavetas (Explorer)
function abrirExplorer() {
    document.getElementById('gaveta-explorer').classList.add('active');
}

function fecharExplorer() {
    document.getElementById('gaveta-explorer').classList.remove('active');
}
