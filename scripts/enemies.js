class Enemy {
  constructor(x, y, vx, vy, radius, color) {
    this.x = x;
    this.y = y;
    this.vx = vx; // velocidade x
    this.vy = vy; // velocidade y
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

  move = () => {
    this.x += this.vx;
    this.y += this.vy;
  };
}
