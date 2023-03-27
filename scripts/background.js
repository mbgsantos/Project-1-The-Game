class Background {
  constructor(image) {
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.loaded = false;

    const img = new Image();
    img.addEventListener('load', () => {
      // once the image is loaded, draw it
      this.loaded = true;
      this.img = img;
      this.draw();
    });

    img.src = image;
  }

  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
