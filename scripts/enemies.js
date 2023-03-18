class Enemies {
  constructor(width, height, color) {
    this.width = width;
    this.height = height;
    color = 'red';
  }

  drawEnemies = () => {
    this.enemies.forEach(enemies => {
      enemies.x -= 1;
      enemies.draw();
    });

    game.frames += 1;
  };
}
