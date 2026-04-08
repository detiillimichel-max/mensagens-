// --- OIO ONE: SISTEMA DE NOTIFICAÇÕES (PLIM) ---

const audioNotificacao = new Audio('https://www.soundjay.com/buttons/sounds/button-3.mp3'); // Som de "Plim" profissional

function dispararNotificacao(titulo, mensagem, tipo = 'msg') {
    // 1. Tocar o som
    audioNotificacao.play().catch(e => console.log("Áudio aguardando interação"));

    // 2. Criar o elemento visual (Toast)
    const toast = document.createElement('div');
    toast.style = `
        position: fixed; top: -100px; left: 10px; right: 10px;
        background: var(--vibe-card); border-left: 5px solid var(--vibe-blue);
        padding: 15px; border-radius: 12px; z-index: 3000;
        display: flex; align-items: center; gap: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    `;

    toast.innerHTML = `
        <div style="width:40px; height:40px; border-radius:50%; background:var(--vibe-blue); display:flex; align-items:center; justify-content:center;">
            <i class="fa-solid ${tipo === 'msg' ? 'fa-comment' : 'fa-bolt'}" style="color:white;"></i>
        </div>
        <div style="flex:1;">
            <strong style="display:block; font-size:14px; color:white;">${titulo}</strong>
            <span style="font-size:12px; color:var(--vibe-gray);">${mensagem.substring(0, 40)}...</span>
        </div>
    `;

    document.body.appendChild(toast);

    // Animar entrada
    setTimeout(() => { toast.style.transform = 'translateY(120px)'; }, 100);

    // Remover após 4 segundos
    setTimeout(() => {
        toast.style.transform = 'translateY(-100px)';
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}

// Lógica para monitorizar novas mensagens
function monitorarNovasInteracoes() {
    const meuNick = localStorage.getItem("vibe_user");

    // Monitorizar Mensagens
    db.limitToLast(1).on("child_added", snap => {
        const m = snap.val();
        // Só notifica se a mensagem for de outra pessoa e tiver menos de 10 segundos (para não disparar mensagens antigas ao abrir)
        if (m.autor !== meuNick && (Date.now() - m.data) < 10000) {
            dispararNotificacao(m.autor, m.texto || "Enviou uma mídia 📷/🎤");
        }
    });

    // Monitorizar Novos Stories
    firebase.database().ref("stories_vibe").limitToLast(1).on("child_added", snap => {
        const s = snap.val();
        if (s.autor !== meuNick && (Date.now() - s.timestamp) < 10000) {
            dispararNotificacao("Novo Story!", `${s.autor} acabou de postar.`, 'story');
        }
    });
}

