console.log('JS Loaded');

const canvas = document.getElementById('monsters');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gravity = 0.4;

const player = new Player(100, 400, 0, 2, 0, 25, 'green');
// const platform = new Platform(500, 700, 200, 20, 'blue');
const game = new Game(player);

updateCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  player.startBottom();
  // platform.detectPlatform();
  game.score();

  player.vy = player.vy + (gravity - player.pull);
  player.y += player.vy;
  player.x += player.vx;

  player.draw();
  // platform.draw();

  requestAnimationFrame(updateCanvas);
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
