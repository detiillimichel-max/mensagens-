// --- OIO ONE: TOC VÍDEOS (STYLE TIKTOK) ---

function abrirTocVideos() {
    const container = document.getElementById('app-container');
    
    container.innerHTML = `
        <div id="video-feed" style="width: 100%; height: 100vh; background: black; overflow-y: scroll; scroll-snap-type: y mandatory;">
            <div style="height: 100%; display: flex; align-items: center; justify-content: center; color: white;">
                <p><i class="fa-solid fa-circle-notch fa-spin"></i> Buscando Vídeos...</p>
            </div>
        </div>
    `;

    carregarVideosFirebase();
}

function carregarVideosFirebase() {
    const feed = document.getElementById('video-feed');
    
    firebase.database().ref("videos_vibe").on("value", snap => {
        feed.innerHTML = "";
        snap.forEach(child => {
            const v = child.val();
            const videoCard = document.createElement('div');
            videoCard.style = "width: 100%; height: 100vh; scroll-snap-align: start; position: relative; background: black;";
            videoCard.innerHTML = `
                <video src="${v.url}" style="width: 100%; height: 100%; object-fit: cover;" loop onclick="this.paused ? this.play() : this.pause()"></video>
                
                <div style="position: absolute; bottom: 100px; left: 20px; color: white; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
                    <h4 style="margin: 0;">@${v.autor}</h4>
                    <p style="font-size: 14px; margin: 5px 0;">${v.legenda}</p>
                </div>

                <div style="position: absolute; right: 15px; bottom: 120px; display: flex; flex-direction: column; gap: 20px; align-items: center;">
                    <div style="text-align: center;"><i class="fa-solid fa-heart" style="font-size: 28px; color: white;"></i><br><small style="color: white;">${v.likes || 0}</small></div>
                    <div style="text-align: center;"><i class="fa-solid fa-comment" style="font-size: 28px; color: white;"></i><br><small style="color: white;">0</small></div>
                </div>
            `;
            feed.appendChild(videoCard);
        });
    });
}

