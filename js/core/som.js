// --- OIO ONE: CONTROLADOR DE SOM ---
window.OioSom = {
    clique: function() {
        this.play('assets/sounds/click.mp3');
    },
    notificacao: function() {
        this.play('assets/sounds/notify.mp3');
    },
    play: function(caminho) {
        try {
            const audio = new Audio(caminho);
            audio.play().catch(e => console.log("Som bloqueado pelo navegador ou arquivo ausente"));
        } catch (e) {
            console.error("Erro ao tocar som:", e);
        }
    }
};
