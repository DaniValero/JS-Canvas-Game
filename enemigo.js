class Enemigo {
    constructor(x, y, ctx) {
        this.ctx = ctx;
        this.w = 25;
        this.h = 35;
        this.dy = 1;
        this.x = x;
        this.y = y - 50
        
        this.img = new Image();
        this.img.src = "images/barrel.png"
        this.img.frames = 4;
        this.img.frameIndex = 0;
      }
    move() {
      this.y += this.dy;
    }

    
    draw(framesCounter) {

    this.ctx.drawImage(
        this.img,
        this.x,
        this.y,
        this.w,
        this.h
        );
    
    this.animateImg(framesCounter);
    
    }


    animateImg(framesCounter) {
        if (framesCounter % 4 === 0) {
          this.img.frameIndex += 1;
          if (this.img.frameIndex > this.img.frames - 1) this.img.frameIndex = 0;
        }
      }

      
  }
  
