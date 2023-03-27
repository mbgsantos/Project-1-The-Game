class Enemy {
  constructor(x, y, vx, vy, radius) {
    this.x = x;
    this.y = y;
    this.vx = vx; // velocidade x
    this.vy = vy; // velocidade y
    this.radius = radius;
    this.imagesArray = [
      '/images/rex.png',
      '/images/buzz.png',
      '/images/burro.png'
    ];
    this.image = new Image();
    this.image.src = this.randomImg();
    // this.imgIndex = Math.floor(Math.random() * this.images.length);
  }

  randomImg = () => {
    // a Array deve aparecer de forma aleatória.
    // a lógica é a mesma da usada para o createEnemies, no ficheiro game.js
    // Math.floor(Math.random()...)
    return this.imagesArray[
      Math.floor(Math.random() * this.imagesArray.length)
    ];
  };

  draw = () => {
    // enemyImg.src = '/images/rex-png.png';
    ctx.drawImage(
      this.image,
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

  move = () => {
    this.x += this.vx;
    this.y += this.vy;
  };
}
