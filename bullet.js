class Bullet {
    constructor(x, y, y0, h, vx, ctx) {
      this.x = x;
      this.y = y;
      this.y0 = y0
      this.h = h
      this.ctx = ctx
      this.r = 5;
      this.vx = vx
      this.vy = 1;
      
    }
  
    draw() {
      this.ctx.beginPath();
      this.ctx.fillStyle = "red";
      this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.closePath();
    }
  
    move() {

        if(this.vx > 0) {
        this.x += this.vx;
        } else {this.x += this.vx}
        

    }
    
  }