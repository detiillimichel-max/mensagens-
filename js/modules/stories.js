// --- OIO ONE: STORIES ENGINE (PREMIUM) ---

function renderStoriesBar() {
    const nick = localStorage.getItem("vibe_user") || "Usuário";
    
    return `
        <div class="stories-wrapper" style="display:flex; gap:15px; overflow-x:auto; padding: 15px; background: rgba(13, 20, 24, 0.5); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(45, 161, 248, 0.1);">
            
            <div onclick="document.getElementById('storyInput').click()" style="display:flex; flex-direction:column; align-items:center; min-width:70px; cursor:pointer;">
                <div style="width:65px; height:65px; border-radius:50%; background:#1e2a3a; display:flex; align-items:center; justify-content:center; border: 2px dashed #2da1f8; position:relative;">
                    <i class="fa-solid fa-plus" style="color:#2da1f8; font-size: 20px;"></i>
                </div>
                <span style="font-size:10px; margin-top:5px; color:gray;">Meu Status</span>
            </div>
            
            <div id="lista-stories-dinamica" style="display:flex; gap:15px;">
                </div>
        </div>
        <input type="file" id="storyInput" style="display:none;" accept="image/*" onchange="postarStory(this)">
    `;
}

function postarStory(input) {
    const file = input.files[0];
    const nick = localStorage.getItem("vibe_user") || "Anônimo";

    if (file) {
        // Feedback visual de carregamento
        alert("Enviando seu Story para o Vibe...");
        
        const reader = new FileReader();
        reader.onload = (e) => {
            firebase.database().ref("stories_vibe").push({
                autor: nick,
                imagem: e.target.result,
                timestamp: Date.now()
            }).then(() => {
                if (navigator.vibrate) navigator.vibrate([50, 30, 50]);
                alert("Story publicado!");
            });
        };
        reader.readAsDataURL(file);
    }
}

function carregarStories() {
    const lista = document.getElementById('lista-stories-dinamica');
    if (!lista) return;

    const agora = Date.now();
    const vinteEQuatroHoras = 24 * 60 * 60 * 1000;

    firebase.database().ref("stories_vibe").on("value", snap => {
        lista.innerHTML = "";
        let temStory = false;

        snap.forEach(child => {
            const s = child.val();
            if (agora - s.timestamp < vinteEQuatroHoras) {
                temStory = true;
                const item = document.createElement('div');
                item.className = "story-circle-item";
                item.style = "display:flex; flex-direction:column; align-items:center; min-width:70px; animation: fadeIn 0.5s ease;";
                item.onclick = () => verFullStory(s.imagem, s.autor);
                
                item.innerHTML = `
                    <div style="width:65px; height:65px; border-radius:50%; border: 2px solid #2da1f8; padding:3px; background: #0d1418;">
                        <img src="https://ui-avatars.com/api/?name=${s.autor}&background=2da1f8&color=fff" style="width:100%; height:100%; border-radius:50%; object-fit:cover;">
                    </div>
                    <span style="font-size:10px; margin-top:5px; color: white;">${s.autor}</span>
                `;
                lista.prepend(item);
            }
        });

        if (!temStory) {
            lista.innerHTML = `<p style="color:gray; font-size:10px; align-self:center; margin-left:10px;">Nenhum status novo</p>`;
        }
    });
}

function verFullStory(img, autor) {
    const viewer = document.createElement('div');
    viewer.id = "story-viewer";
    viewer.style = "position:fixed; top:0; left:0; width:100%; height:100%; background:black; z-index:9999; display:flex; flex-direction:column; animation: zoomIn 0.2s ease;";
    
    viewer.innerHTML = `
        <div style="position:absolute; top:10px; left:0; width:100%; padding: 0 10px; display:flex; gap:5px; z-index:10;">
            <div style="height:2px; flex:1; background:rgba(255,255,255,0.3); border-radius:2px; overflow:hidden;">
                <div id="progresso-story" style="width:0%; height:100%; background:white; transition: width 5s linear;"></div>
            </div>
        </div>

        <div style="padding:30px 20px 20px 20px; display:flex; align-items:center; justify-content:space-between; background:linear-gradient(to bottom, rgba(0,0,0,0.9), transparent); color:white; position:absolute; width:100%; z-index:5;">
            <div style="display:flex; align-items:center; gap:10px;">
                <div style="width:35px; height:35px; border-radius:50%; background:#2da1f8; display:flex; align-items:center; justify-content:center; font-size:14px; font-weight:bold;">${autor.charAt(0)}</div>
                <strong>${autor}</strong>
            </div>
            <i class="fa-solid fa-xmark" style="font-size:24px;" onclick="document.getElementById('story-viewer').remove()"></i>
        </div>

        <img src="${img}" style="width:100%; height:100%; object-fit:contain; background:#000;">
    `;
    
    document.body.appendChild(viewer);

    // Inicia a animação da barra de progresso
    setTimeout(() => {
        const barra = document.getElementById('progresso-story');
        if(barra) barra.style.width = "100%";
    }, 50);
    
    // Fecha sozinho após 5 segundos
    const tempoStory = setTimeout(() => { 
        if(document.getElementById('story-viewer')) document.getElementById('story-viewer').remove(); 
    }, 5000);
}
