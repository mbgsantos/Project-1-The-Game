class Player {
  constructor(x, y, vx, vy, pull, radius, color) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.pull = pull;
    this.radius = radius;
    this.color = color;
  }

  draw = () => {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  };

  startBottom = () => {
    let rockBottom = canvas.height - this.radius;
    if (this.y > rockBottom) {
      this.y = rockBottom;
      this.vy = 0;
    }
  };
}
