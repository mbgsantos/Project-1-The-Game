class Game {
  constructor(player) {
    this.player = player;

    this.interval = undefined;

    this.frames = 0;

    this.enemies = [];

    // this.enemyColor = 'red';

    this.enemySpeed = 5;

    this.currentScore = 0;
  }

  score = () => {
    this.frames += 1;
    this.currentScore = Math.floor(this.frames / 6);
    ctx.font = '20px Roboto';
    ctx.fillStyle = 'rgb(153, 171, 182)';
    // texto centrado
    // ctx.fillText(`Score: ${this.currentScore}`, canvas.width / 2, 50);
    ctx.fillText(`SCORE: ${this.currentScore}`, 50, 50);
  };

  createEnemies = () => {
    const enemyRadius = 20;

    if (this.frames % (90 - this.enemySpeed * 3) === 0) {
      // este calculo foi feito depois de criar a increaseDifficulty
      // foi a forma que arranjei de diminuir o tempo entre cada criação de inimigos
      // a lógica usada foi a mesma da usada para a área da criação do inimigo
      const x = canvas.width + enemyRadius;

      const y = Math.floor(
        Math.random() * (canvas.height - enemyRadius * 4) + enemyRadius * 2
      ); // posição do y para um valor random entre 0 e a altura do canvas
      // console.log('this is y', y);
      const vx = -this.enemySpeed; // vx negativa faz com que surjam do lado direito para esquerdo

      const vy = 0;

      const enemy = new Enemy(x, y, vx, vy, enemyRadius);
      this.enemies.push(enemy);
    }
  };

  increaseDifficulty = () => {
    if (this.currentScore % 100 === 0 && this.currentScore !== 0) {
      // this.currentScore !== 0 evita que a velocidade dos inimigos
      // aumente no inicio do jogo, quando o score é 0
      this.enemySpeed += 1;
    }
  };
}
