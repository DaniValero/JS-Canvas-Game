const img = {}
img.player = new Image();





class Player {
    constructor(w, h, ctx, keys) {
      this.canvasW = w;
      this.canvasH = h;
      this.ctx = ctx;
      this.keys = keys;
      this.x = this.canvasW * 0.5;
      this.y = this.canvasH * 0.5;
      this.action = "idle"

      this.vy = 1

      this.dx0 = 8;
      this.dx = this.dx0;
      this.dy = 1;
      


      // Animacion idle
      this.img = new Image();
      this.img.src = "images/idle-Sheet.png";
    
      this.img.frames = 8;
      this.img.frameIndex = 0;
  
      // medidas de la imagen a representar en el canvas
      this.w = 50;
      this.h = 50;

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
       if (event.keyCode == this.keys.RIGHT_ARROW) {
        this.img.src = "images/run-right.png";
        if (this.img.frameIndex > 7) {this.img.frameIndex = 0}

        if (this.x < 750) {
          this.x += 8
          } else {
            this.x = 750;
            this.dx = 0;
          }
        }else if (event.keyCode == this.keys.RIGHT_ARROW) {
            this.img.src = "images/run-right.png";
            if (this.img.frameIndex > 7) {this.img.frameIndex = 0}
    
            if (this.x < 750) {
              this.x += 8
              } else {
                this.x = 750;
                this.dx = 0;
              }
        } else if (event.keyCode == this.keys.LEFT_ARROW) {
          this.img.src = "images/run-left.png"
          if (this.img.frameIndex > 7) {this.img.frameIndex = 0}
          if(this.x >= 0) {
            this.x -= 8
          } else {
            this.x = 0
            this.dx = 0;
          }
        } else if (event.keyCode == this.keys.SPACE) {
          this.img.src = "images/jump-right.png"
          this.img.frames = 11;
          if (this.img.frameIndex > 10) this.img.frameIndex = 0;
          this.y -= 20;
          this.vy -= 10;
        } 
      document.onkeyup = function (event) {
        this.img.src = "images/idle-Sheet.png"
        this,img.frames = 8;
        if (this.img.frameIndex > 7) this.img.frameIndex = 0;
      }
      }.bind(this);
    }

    move() {

      this.setListeners()

      var gravity = 0.4;
      if (this.y <= (this.canvasH * 0.5)) {
      this.vy += gravity
      this.y += this.vy;
      }
    }
  
    animateImg(framesCounter) {
      if (framesCounter % 6 === 0) {
        this.img.frameIndex += 1;}
        if (this.img.frameIndex > 7) this.img.frameIndex = 0;
      }


}

