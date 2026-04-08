// --- OIO ONE: STORIES (ESTILO INSTAGRAM/WHATSAPP) ---

function renderStoriesBar() {
    const nick = localStorage.getItem("vibe_user");
    return `
        <div class="stories-wrapper" style="display:flex; gap:15px; overflow-x:auto; padding: 15px 0; border-bottom: 1px solid var(--glass);">
            <div onclick="document.getElementById('storyInput').click()" style="display:flex; flex-direction:column; align-items:center; min-width:70px;">
                <div style="width:60px; height:60px; border-radius:50%; background:var(--vibe-card); display:flex; align-items:center; justify-content:center; border: 2px dashed var(--vibe-blue); position:relative;">
                    <i class="fa-solid fa-plus" style="color:var(--vibe-blue);"></i>
                </div>
                <span style="font-size:10px; margin-top:5px; color:var(--vibe-gray);">O seu status</span>
            </div>
            
            <div id="lista-stories-dinamica" style="display:flex; gap:15px;">
                </div>
        </div>
        <input type="file" id="storyInput" style="display:none;" accept="image/*" onchange="postarStory(this)">
    `;
}

function postarStory(input) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const nick = localStorage.getItem("vibe_user");
            // Salva no Firebase numa pasta separada 'stories_vibe'
            firebase.database().ref("stories_vibe").push({
                autor: nick,
                imagem: e.target.result,
                timestamp: Date.now()
            });
            alert("Story postado com sucesso!");
        };
        reader.readAsDataURL(file);
    }
}

function carregarStories() {
    const lista = document.getElementById('lista-stories-dinamica');
    const agora = Date.now();
    const vinteEQuatroHoras = 24 * 60 * 60 * 1000;

    firebase.database().ref("stories_vibe").on("value", snap => {
        lista.innerHTML = "";
        snap.forEach(child => {
            const s = child.val();
            // Só mostra se tiver menos de 24 horas
            if (agora - s.timestamp < vinteEQuatroHoras) {
                const item = document.createElement('div');
                item.style = "display:flex; flex-direction:column; align-items:center; min-width:70px;";
                item.onclick = () => verFullStory(s.imagem, s.autor);
                item.innerHTML = `
                    <div style="width:60px; height:60px; border-radius:50%; border: 2px solid var(--vibe-blue); padding:2px;">
                        <img src="https://ui-avatars.com/api/?name=${s.autor}&background=random" style="width:100%; height:100%; border-radius:50%; object-fit:cover;">
                    </div>
                    <span style="font-size:10px; margin-top:5px;">${s.autor}</span>
                `;
                lista.prepend(item);
            }
        });
    });
}

function verFullStory(img, autor) {
    // Cria um visualizador simples em ecrã inteiro
    const viewer = document.createElement('div');
    viewer.id = "story-viewer";
    viewer.style = "position:fixed; top:0; left:0; width:100%; height:100%; background:black; z-index:2000; display:flex; flex-direction:column;";
    viewer.innerHTML = `
        <div style="padding:20px; display:flex; align-items:center; gap:10px; background:linear-gradient(to bottom, rgba(0,0,0,0.8), transparent); color:white; position:absolute; width:100%;">
            <i class="fa-solid fa-arrow-left" onclick="document.getElementById('story-viewer').remove()"></i>
            <strong>${autor}</strong>
        </div>
        <img src="${img}" style="width:100%; height:100%; object-fit:contain;">
    `;
    document.body.appendChild(viewer);
    
    // Fecha sozinho após 5 segundos
    setTimeout(() => { if(document.getElementById('story-viewer')) document.getElementById('story-viewer').remove(); }, 5000);
}

