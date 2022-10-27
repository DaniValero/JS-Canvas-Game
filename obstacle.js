class Obstacle {
    constructor(w, playerY, playerH, ctx) {
      this.ctx = ctx;
      this.w = 200;
      this.h = 15;
      this.dy = 1;
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

class ObstacleStart {
  constructor(w, playerY, playerH, ctx) {
    this.ctx = ctx;
    this.w = 100;
    this.h = 15;
    this.dy = 1;
    this.x = this.canvasH * 0.5
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
  
  