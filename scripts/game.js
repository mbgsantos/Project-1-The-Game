class Game {
  constructor(player) {
    this.player = player;

    this.interval = undefined;

    this.frames = 0;

    this.platform = [];
  }

  score = () => {
    this.frames += 1;
    const score = Math.floor(this.frames / 6);
    ctx.font = '14px Verdana';
    ctx.fillStyle = 'purple';
    ctx.fillText(`Your score: ${score}`, 100, 50);
  };
}
