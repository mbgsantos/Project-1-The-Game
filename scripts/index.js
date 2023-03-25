console.log('JS Loaded');

const canvas = document.getElementById('monsters');
const ctx = canvas.getContext('2d');
const restartButton = document.getElementById('restart');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gravity = 0.4;

const player = new Player(100, 400, 0, 2, 0, 25, 'green');
// const platform = new Platform(500, 700, 200, 20, 'blue');

const platform = [
  // array com as plataformas que quisermos criar
  // rgba permite fazer transparências
  new Platform(200, 100, 150, 20, '#b2c7c8'),
  new Platform(200, 300, 150, 20, '#b2c7c8'),
  new Platform(200, 500, 150, 20, 'rgba(255, 255, 255, 0)'),
  new Platform(200, 700, 150, 20, '#b2c7c8'),
  new Platform(500, 700, 150, 20, '#b2c7c8'),
  new Platform(800, 700, 150, 20, '#b2c7c8'),
  new Platform(1100, 700, 150, 20, '#b2c7c8')
];

const game = new Game(player);

updateCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  player.startBottom();
  // platform.detectPlatform();
  game.score();
  game.createEnemies();
  game.increaseDifficulty();

  player.vy = player.vy + (gravity - player.pull);
  player.y += player.vy;
  player.x += player.vx;

  player.draw();
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
    ctx.font = '40px Verdana';
    ctx.fillStyle = 'red';
    ctx.textAlign = 'center';
    ctx.fillText(
      'We have a 23-19! Prepare for decontamination',
      canvas.width / 2,
      canvas.height / 2
    );

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
      player.vx += 3;
      break;

    case 'ArrowLeft':
      player.vx -= 3;
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
