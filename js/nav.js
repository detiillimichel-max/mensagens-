/* LÓGICA DE NAVEGAÇÃO DO RODAPÉ - OIO ONE */

function navegarApp(idAba, elementoClicado) {
    // 1. Esconde todas as seções
    const secoes = document.querySelectorAll('.view-section');
    secoes.forEach(secao => {
        secao.classList.remove('active');
    });

    // 2. Remove o azul de todos os botões do menu
    const botoesMenu = document.querySelectorAll('.nav-item');
    botoesMenu.forEach(botao => {
        botao.classList.remove('active');
    });

    // 3. Mostra a seção desejada e acende o botão clicado
    document.getElementById(idAba).classList.add('active');
    elementoClicado.classList.add('active');

    // 4. Som de clique e vibração para dar sensação premium
    if (window.OioSom && typeof window.OioSom.clique === 'function') {
        window.OioSom.clique();
    }
    if (navigator.vibrate) {
        navigator.vibrate(20);
    }
}

