class Player {
    constructor(w, h, ctx, keys) {
      this.canvasW = w;
      this.canvasH = h;
      this.ctx = ctx;
      this.keys = keys;
      this.x = this.canvasW * 0.1
      this.y0 = 485
      this.y = this.y0
      this.yp = this.y
    
      this.vy = 1
     

      this.dx = 0
      this.dy = 0

      // Animacion idle
      this.img = new Image();
      this.img.src = "images/run-right.png"
    
      this.img.frames = 8;
      this.img.frameIndex = 0;

      this.w = 50;
      this.h = 50;

      this.setListeners()

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
  
    setListeners() {
      document.onkeydown = function(event) {
      
        // SALTO

        if (event.keyCode == this.keys.SPACE && this.y === this.y0 || this.y === this.yp)  {
          
            this.img.frames = 11;
            this.img.src = "images/jump-right.png"
            if (this.img.frameIndex > 10) this.img.frameIndex = 0;
          
            this.vy = -10
            this.y -= 5
         
        }

        // if (this.y <= this.y0) {
        //     if (event.keyCode == this.keys.SPACE)  {
          
        //         this.img.frames = 7;
        //         this.img.src = "images/jetpack.png"
        //         if (this.img.frameIndex > 6) this.img.frameIndex = 0;
              
        //         this.dy = 10
        //         this.y -= this.dy

        //     }
        // }
      }.bind(this);

      document.onkeyup = function(event) {

        if (event.keyCode == this.keys.SPACE) {
            this.img.frames = 8;
            this.img.src = "images/run-right.png"
          
            if (this.img.frameIndex > 7) this.img.frameIndex = 0;

          this.dy = 0
        }
      }.bind(this);
    }



    move() {
      
      var gravity = 0.3;

      if (this.y >= this.y0) {
        this.vy = 1;
        this.y = this.y0;
      } else {
        this.vy += gravity;
        this.y += this.vy;
      }
      //this.y -= this.dy
    }
    
  
    animateImg(framesCounter) {
  
      if (framesCounter % 6 === 0) {
        this.img.frameIndex += 1;
        if (this.img.frameIndex > 6) this.img.frameIndex = 0;
      }
    }

}

