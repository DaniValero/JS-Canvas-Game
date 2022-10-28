

class Obstacle {
    constructor(x, y, ctx) {
      this.ctx = ctx;
      this.w = 200;
      this.h = 15;
      this.dy = 1;
  
      this.x = x
      this.y = y
    }
  
    draw() {
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(this.x, this.y, this.w, this.h);
    }
  
    move() {
      this.y += this.dy;
    }
  }

  