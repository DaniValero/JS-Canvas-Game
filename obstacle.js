class Obstacle {
    constructor(x, y, ctx) {
      this.ctx = ctx;
      this.w = 200;
      this.h = 15;
      this.dy = 1;
      this.img = new Image();
      this.img.src = "images/plataforma.png"
  
      this.x = x
      this.y = y
    }
  
    draw() {
      this.ctx.drawImage(
        this.img,
        this.x,
        this.y,
        this.w,
        this.h
      );
    }
  
    move() {
      this.y += this.dy;
    }
  }

  