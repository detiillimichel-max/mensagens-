// --- OIO ONE: ENGINE DE SONORIZAÇÃO ---

const OioSom = {
    // Sons estilo interface de luxo
    sons: {
        clique: new Audio('https://www.soundjay.com/buttons/sounds/button-16.mp3'),
        mensagem: new Audio('https://www.soundjay.com/buttons/sounds/button-09.mp3'),
        enviado: new Audio('https://www.soundjay.com/communication/sounds/digital-beeps-05.mp3'),
        erro: new Audio('https://www.soundjay.com/buttons/sounds/button-10.mp3')
    },

    tocar(nome) {
        if (this.sons[nome]) {
            this.sons[nome].currentTime = 0; // Reinicia o som se clicar rápido
            this.sons[nome].play().catch(e => console.log("Aguardando interação para som"));
        }
    },

    // Atalhos para as funções que você já usa
    clique() { this.tocar('clique'); },
    notificacao() { this.tocar('mensagem'); },
    sucesso() { this.tocar('enviado'); }
};

// Deixa global para o nav.js e chat.js usarem
window.OioSom = OioSom;

