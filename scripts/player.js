class Player {
  constructor(x, y, vx, vy, pull, radius, spriteImage) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.pull = pull;
    this.radius = radius;
    this.spriteImage = spriteImage;
    this.sprite = new Image();
    this.sprite.src = spriteImage;
    this.frames = [
      // todas as frames da personagem a andar
      { x: 0, y: 0, width: 52, height: 51 },
      { x: 0, y: 198, width: 52, height: 56 },
      { x: 54, y: 198, width: 52, height: 56 },
      { x: 117, y: 198, width: 52, height: 56 },
      { x: 172, y: 197, width: 52, height: 56 },
      { x: 225, y: 195, width: 52, height: 56 },
      { x: 280, y: 197, width: 52, height: 56 },
      { x: 341, y: 199, width: 60, height: 56 },
      { x: 404, y: 201, width: 52, height: 56 }
    ];
    this.currentFrameIndex = 0; // onde a sprite começa
  }
  /* constructor(x, y, vx, vy, pull, radius, color) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.pull = pull;
    this.radius = radius;
    this.color = color;
  } */

  updateSprite = () => {
    // fazer update à currentFrameIndex
    this.currentFrameIndex = (this.currentFrameIndex + 1) % this.frames.length;

    // tentativa de fazer o andar do player mais normal
    /* if (this.vx += 1) {
      this.currentFrameIndex =
        (this.currentFrameIndex + 1) % this.frames.length;
    } else if (this.vx -= 1) {
      this.currentFrameIndex =
        (this.currentFrameIndex - 1) % this.frames.length;
    } else {
      this.currentFrameIndex = 0;
    } */
  };

  moveBackwards = () => {
    console.log(this.currentFrameIndex);
    this.currentFrameIndex -= 1;
    if (this.currentFrameIndex === 0) {
      this.currentFrameIndex = this.frames.length - 1;
    }
  };

  draw = () => {
    // desenhar o frame da animação
    const frame = this.frames[this.currentFrameIndex];
    ctx.drawImage(
      this.sprite,
      frame.x,
      frame.y,
      frame.width,
      frame.height,
      this.x - this.radius,
      this.y - this.radius,
      this.radius * 2,
      this.radius * 2
    );
    /* ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill(); */
  };

  startBottom = () => {
    let rockBottom = canvas.height - this.radius;
    if (this.y > rockBottom) {
      this.y = rockBottom;
      this.vy = 0;
    }
  };
}
