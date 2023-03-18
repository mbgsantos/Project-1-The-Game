class Platform {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw = () => {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };

  detectPlatform = () => {
    let platformBottom = this.y - player.radius;
    if (
      player.y > platformBottom &&
      player.x + player.radius > this.x &&
      player.x - player.radius < this.x + this.width &&
      player.y < this.y
    ) {
      player.y = platformBottom;
      player.vy = 0;
    }
  };
}
