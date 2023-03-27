console.log('JS Loaded');

const canvas = document.getElementById('monsters');
const ctx = canvas.getContext('2d');
const restartButton = document.getElementById('restart');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gravity = 0.4;

// const player = new Player(100, 400, 0, 2, 0, 25, 'green');
const player = new Player(100, 400, 0, 2, 0, 50, '/images/Sully-png.png');
// const platform = new Platform(500, 700, 200, 20, 'blue');

const platform = [
  // array com as plataformas que quisermos criar
  // rgba permite fazer transparências
  new Platform(35, 690, 1305, 20, 'rgba(0, 0, 0, 0)'),
  new Platform(190, 465, 335, 10, 'rgba(0, 0, 0, 0)'),
  new Platform(565, 465, 240, 10, 'rgba(0, 0, 0, 0)'),
  new Platform(880, 465, 65, 10, 'rgba(0, 0, 0, 0)'),
  new Platform(1050, 465, 120, 10, 'rgba(0, 0, 0, 0)'),
  new Platform(230, 163, 50, 10, 'rgba(0, 0, 0, 0)'),
  new Platform(230, 348, 50, 10, 'rgba(0, 0, 0, 0)'),
  new Platform(395, 163, 90, 10, 'rgba(0, 0, 0, 0)'),
  new Platform(395, 348, 90, 10, 'rgba(0, 0, 0, 0)'),
  new Platform(610, 163, 50, 10, 'rgba(0, 0, 0, 0)'),
  new Platform(610, 348, 50, 10, 'rgba(0, 0, 0, 0)'),
  new Platform(710, 163, 50, 10, 'rgba(0, 0, 0, 0)'),
  new Platform(710, 348, 50, 10, 'rgba(0, 0, 0, 0)'),
  new Platform(880, 163, 70, 10, 'rgba(0, 0, 0, 0)'),
  new Platform(880, 348, 70, 10, 'rgba(0, 0, 0, 0)'),
  new Platform(1070, 163, 70, 10, 'rgba(0, 0, 0, 0)'),
  new Platform(1070, 348, 70, 10, 'rgba(0, 0, 0, 0)')
  // exemplo de transparência
  // new Platform(1100, 500, 150, 20, 'rgba(255, 255, 255, 0)')
];

const game = new Game(player);
const background = new Background('/images/fundo.jpg');

updateCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (background.loaded) {
    background.draw();
  }

  player.startBottom();
  // platform.detectPlatform();
  game.score();
  game.createEnemies();
  game.increaseDifficulty();

  player.vy = player.vy + (gravity - player.pull);
  player.y += player.vy;
  player.x += player.vx;

  player.draw();
  // player.updateSprite();
  // platform.draw();

  platform.forEach(platform => {
    platform.detectPlatform(); // usa a detectPlatform para detetar as zonas de contacto
    platform.draw(); // cria as plataformas da array platform
  });
  let gameOver = false;

  game.enemies.forEach(enemy => {
    enemy.move();
    enemy.draw();

    // verificar se há colisão
    let distx = player.x - enemy.x;
    let disty = player.y - enemy.y;
    // Math.sqrt faz raíz quadrada
    let distance = Math.sqrt(distx * distx + disty * disty);
    if (distance < player.radius + enemy.radius) {
      // significa que se o jogador e o inimigo tiveram contacto
      gameOver = true;
    }
  });

  if (gameOver) {
    const boxWidth = 500;
    const boxHeight = 200;
    const boxX = (canvas.width - boxWidth) / 2;
    const boxY = (canvas.height - boxHeight) / 2.3;

    // Desenhar Caixa de Game Over
    ctx.fillStyle = 'rgba(192, 214, 228, 0.8)';
    ctx.fillRect(boxX, boxY, boxWidth, boxHeight);

    // Criar mensagem
    ctx.font = '35px Roboto';
    ctx.fillStyle = 'rgb(107, 119, 127)';
    ctx.textAlign = 'center';
    ctx.fillText('WE HAVE A 23-19!', canvas.width / 2, canvas.height / 2.4);

    restartButton.style.display = 'inline';

    cancelAnimationFrame(gameLoop);
    return;
  }

  let gameLoop = requestAnimationFrame(updateCanvas);
};

updateCanvas();

document.addEventListener('keydown', event => {
  event.preventDefault();

  switch (event.key) {
    case ' ':
      player.pull = 2;
      break;

    case 'ArrowRight':
      player.vx += 4;
      player.updateSprite(); // faz update à sprite animation
      break;

    case 'ArrowLeft':
      player.vx -= 4;
      player.moveBackwards(); // faz update à sprite animation
      break;
  }
});

document.addEventListener('keyup', event => {
  switch (event.key) {
    case ' ':
      player.pull = 0;
      break;

    case 'ArrowRight':
      player.vx = 0;
      break;

    case 'ArrowLeft':
      player.vx = 0;
      break;
  }
});

restartButton.addEventListener('click', () => {
  restartButton.style.display = 'none';

  // faço reset às propriedades do jogo
  game.frames = 0; // frames do jogo
  game.enemies = []; // inimigos
  player.x = 100; // posição inicial do jogador
  player.y = 400; // posição inicial do jogador
  player.vx = 0; // velocidade x do jogador
  player.vy = 2; // velocidade y do jogador
  game.enemySpeed = 5;
  game.currentScore = 0;

  // reinicia-se tudo
  updateCanvas();
});
