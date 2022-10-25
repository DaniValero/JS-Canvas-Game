class Player {
    constructor(w, h, ctx, keys) {
      this.canvasW = w;
      this.canvasH = h;
      this.ctx = ctx;
      this.keys = keys;
      this.x = this.canvasW * 0.5;
      this.y = this.canvasH * 0.5;

      this.vy = 0.5
      this.vx = 1

      this.dx = 0
      this.dy = 0

      // Animacion idle
      this.img = new Image();
      this.img.src = "images/idle-Sheet.png"
    
      this.img.frames = 8;
      this.img.frameIndex = 0;
  
      // medidas de la imagen a representar en el canvas
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
        if (event.keyCode == this.keys.RIGHT_ARROW) {
        console.log("derecha")
        this.dx = 9;
        this.x += this.dx

        this.img.src = "images/run-right.png";
        if (this.img.frameIndex > 7) {this.img.frameIndex = 0}
        // if (this.x < 750) {
        //   this.x += 8
        //   } else {
        //     this.x = 750;
        //     this.dx = 0;
        //   }
        }
        if (event.keyCode == this.keys.LEFT_ARROW) {
          this.img.src = "images/run-left.png"
          if (this.img.frameIndex > 7) {this.img.frameIndex = 0}
          this.dx = 9;
          this.x -= this.dx
        } 
      
        // SALTO DCHA

        if (event.keyCode == this.keys.SPACE)  {

          this.img.src = "images/run-right.png";
          this.dy = 20;
          this.vy = 5;

          this.img.frames = 8;
          if (this.img.frameIndex > 7) this.img.frameIndex = 0;
        }
        
        
      }.bind(this);

      document.onkeyup = function(event) {
        if (event.keyCode == this.keys.RIGHT_ARROW) {
          this.img.src = "images/idle-Sheet.png"
          if (this.img.frameIndex > 7) {this.img.frameIndex = 0}
          this.dx = 0
        }
        if (event.keyCode == this.keys.LEFT_ARROW) {
          this.img.src = "images/idle-Sheet.png"
          if (this.img.frameIndex > 7) {this.img.frameIndex = 0}
          this.dx = 0  
        }

        if (event.keyCode == this.keys.SPACE) {

          this.img.src = "images/idle-Sheet.png"
          this.img.frames = 8;
          if (this.img.frameIndex > 7) this.img.frameIndex = 0;
          this.dy = 0
          this.vy = 1
         
        }
      }.bind(this);
    }


    move() {
      var gravity = 0.5;
      if (this.y <= (this.canvasH * 0.5)) {
      this.vy += gravity
      this.y += this.vy;
      }

      // MOVER DERECHA
      this.x += this.dx

      // MOVER IZQUIERDA
      this.x -= this.dx

      // SALTO
      this.y -= this.dy
      


    }
  
    animateImg(framesCounter) {
  
      if (framesCounter % 6 === 0) {
        this.img.frameIndex += 1;}
        if (this.img.frameIndex > 7) this.img.frameIndex = 0;
      }

}

