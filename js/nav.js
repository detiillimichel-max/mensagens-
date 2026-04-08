/* LÓGICA DE NAVEGAÇÃO DO RODAPÉ - OIO ONE */

function navegarApp(idAba, elementoClicado) {
    // 1. Esconde todas as seções (.view-section)
    const secoes = document.querySelectorAll('.view-section');
    secoes.forEach(secao => {
        secao.classList.remove('active');
    });

    // 2. Remove o estado ativo de todos os botões do menu
    const botoesMenu = document.querySelectorAll('.nav-item');
    botoesMenu.forEach(botao => {
        botao.classList.remove('active');
    });

    // 3. Ativa a seção e o botão visualmente
    const secaoAlvo = document.getElementById(idAba);
    if (secaoAlvo) {
        secaoAlvo.classList.add('active');
    }
    elementoClicado.classList.add('active');

    // --- 4. NOVIDADE: GATILHO DE RENDERIZAÇÃO ---
    // Isso garante que o conteúdo apareça mesmo em celulares "limpos"
    executarLogicaDaAba(idAba);

    // 5. Som de clique e vibração premium (Sua lógica original)
    if (window.OioSom && typeof window.OioSom.clique === 'function') {
        window.OioSom.clique();
    }
    if (navigator.vibrate) {
        navigator.vibrate(20);
    }
}

// Função auxiliar para chamar os scripts específicos de cada tela
function executarLogicaDaAba(idAba) {
    switch(idAba) {
        case 'chats':
            if (typeof renderizarTelaChats === 'function') renderizarTelaChats();
            break;
        case 'explorer':
            if (typeof renderizarTelaExplorer === 'function') renderizarTelaExplorer();
            break;
        case 'contatos':
            if (typeof renderizarTelaContatos === 'function') renderizarTelaContatos();
            break;
        case 'perfil':
            if (typeof renderizarTelaPerfil === 'function') renderizarTelaPerfil();
            break;
    }
}
