// --- OIO ONE: ARCADE (SNAKE GAME NEON) ---

function iniciarSnake() {
    const container = document.getElementById('app-container');
    container.innerHTML = `
        <div style="padding: 20px; text-align: center;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
                <i class="fa-solid fa-arrow-left" onclick="navegar('explorer')" style="font-size:20px;"></i>
                <h3 style="margin:0;">OIO Snake Neon</h3>
                <span id="score">0</span>
            </div>
            <canvas id="snakeGame" width="300" height="300" style="border: 2px solid var(--vibe-blue); border-radius:10px; background:#000;"></canvas>
            
            <div class="controles-game" style="margin-top:20px; display:grid; grid-template-columns: repeat(3, 1fr); gap:10px; width:200px; margin-left:auto; margin-right:auto;">
                <div></div><button onclick="mudarDirecao('UP')" style="padding:15px; background:var(--vibe-card); border:none; color:white; border-radius:10px;"><i class="fa-solid fa-chevron-up"></i></button><div></div>
                <button onclick="mudarDirecao('LEFT')" style="padding:15px; background:var(--vibe-card); border:none; color:white; border-radius:10px;"><i class="fa-solid fa-chevron-left"></i></button>
                <button onclick="mudarDirecao('DOWN')" style="padding:15px; background:var(--vibe-card); border:none; color:white; border-radius:10px;"><i class="fa-solid fa-chevron-down"></i></button>
                <button onclick="mudarDirecao('RIGHT')" style="padding:15px; background:var(--vibe-card); border:none; color:white; border-radius:10px;"><i class="fa-solid fa-chevron-right"></i></button>
            </div>
        </div>
    `;

    const canvas = document.getElementById("snakeGame");
    const ctx = canvas.getContext("2d");
    const box = 20;
    let snake = [{ x: 9 * box, y: 10 * box }];
    let food = { x: Math.floor(Math.random() * 14 + 1) * box, y: Math.floor(Math.random() * 14 + 1) * box };
    let d;
    let score = 0;

    window.mudarDirecao = (dir) => {
        if(dir == "LEFT" && d != "RIGHT") d = "LEFT";
        if(dir == "UP" && d != "DOWN") d = "UP";
        if(dir == "RIGHT" && d != "LEFT") d = "RIGHT";
        if(dir == "DOWN" && d != "UP") d = "DOWN";
    };

    function draw() {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 300, 300);

        for (let i = 0; i < snake.length; i++) {
            ctx.fillStyle = (i == 0) ? "#00f2ff" : "#0055ff"; // Cabeça neon
            ctx.fillRect(snake[i].x, snake[i].y, box, box);
        }

        ctx.fillStyle = "#ff007b"; // Comida Rosa Neon
        ctx.fillRect(food.x, food.y, box, box);

        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if (d == "LEFT") snakeX -= box;
        if (d == "UP") snakeY -= box;
        if (d == "RIGHT") snakeX += box;
        if (d == "DOWN") snakeY += box;

        if (snakeX == food.x && snakeY == food.y) {
            score++;
            document.getElementById('score').innerText = score;
            food = { x: Math.floor(Math.random() * 14 + 1) * box, y: Math.floor(Math.random() * 14 + 1) * box };
        } else {
            snake.pop();
        }

        let newHead = { x: snakeX, y: snakeY };

        // Game Over
        if (snakeX < 0 || snakeX >= 300 || snakeY < 0 || snakeY >= 300 || colision(newHead, snake)) {
            clearInterval(game);
            alert("Game Over! Pontos: " + score);
            navegar('explorer');
        }

        snake.unshift(newHead);
    }

    function colision(head, array) {
        for (let i = 0; i < array.length; i++) {
            if (head.x == array[i].x && head.y == array[i].y) return true;
        }
        return false;
    }

    let game = setInterval(draw, 150);
}

