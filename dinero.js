class Dinero {
    constructor(x, y, ctx) {
        this.ctx = ctx;
        this.w = 25;
        this.h = 25;
        this.dx = 5;
        this.x = x;
        this.y = y - 50
        
        this.img = new Image();
        this.img.src = "images/moneda.png"
        this.img.frames = 6;
        this.img.frameIndex = 0;

      }
 
  
    move() {
      this.x -= this.dx;
    }

    
    draw(framesCounter) {

      


        this.ctx.drawImage(
          this.img,
          this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
          0,
          Math.floor(this.img.width / this.img.frames),
          this.img.height,
          this.x,
          this.y,
          this.w,
          this.h
        );
    
        this.animateImg(framesCounter);
    
      }


      animateImg(framesCounter) {
        if (framesCounter % 6 === 0) {
          this.img.frameIndex += 1;
          if (this.img.frameIndex > this.img.frames - 1) this.img.frameIndex = 0;
        }
      }

      
  }
  
