class Obstacle {
    constructor(w, playerY, playerH, ctx) {
      this.ctx = ctx;
      this.w = 200;
      this.h = 15;
      this.dy = 2;
      this.x = 0
      this.y = 0
    }
  
    draw() {
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(this.x, this.y, this.w, this.h);
    }
  
    move() {
      this.y += this.dy;
    }
  }
  
  