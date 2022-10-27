class Player {
    constructor(w, h, x, y,ctx, keys) {
      this.canvasW = w;
      this.canvasH = h;
      this.ctx = ctx;
      this.keys = keys;

       // Animacion idle
       this.img = new Image();
       this.img.src = "images/idle-Sheet.png"
     
       this.img.frames = 8;
       this.img.frameIndex = 0;
   
       // medidas de la imagen a representar en el canvas
       this.w = 50;
       this.h = 50;

       
      this.x = x - this.h / 2;
      

      this.y = y - this.h;

     
      this.vy = 1
      this.vx = 1

      this.dx = 0
      this.dy = 1;

      this.falling = false

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
  
    // https://www.w3schools.com/graphics/game_controllers.asp
    setListeners() {
      document.onkeydown = function(event) {
        if (event.keyCode == this.keys.RIGHT_ARROW) {
        this.dx = 3;
        this.img.src = "images/run-right.png";
        this.img.frames = 8
        }
      
        if (event.keyCode == this.keys.LEFT_ARROW) {
          // this.img.src = "images/jetpack.png"
          // if (this.img.frameIndex > 7) {this.img.frameIndex = 0}
          this.dx = -3;
          this.img.src = "images/run-left.png";
          this.img.frames = 8
        } 
      
        // SALTO

        if (event.keyCode == this.keys.SPACE && !this.falling)  {
          
          this.y -= 5
          this.vy = -10;
          this.falling = true;
          this.img.src = "images/jetpack.png"
          this.img.frames = 7;
          this.img.frameIndex = 0;
        }
      }.bind(this);

      document.onkeyup = function(event) {
        if (event.keyCode == this.keys.RIGHT_ARROW) {
          this.dx = 0
        }

        if (event.keyCode == this.keys.LEFT_ARROW) {
          this.dx = 0
        }
     

        if (event.keyCode == this.keys.SPACE) {

          // this.img.src = "images/idle-Sheet.png"
          // this.img.frames = 8;
          // if (this.img.frameIndex > 7) this.img.frameIndex = 0;
    
          // this.vy = 1
         
        }
      }.bind(this);
    }


    move() {
      
      var gravity = 0.38;

      if (!this.falling) {
       this.vy = 1;
        
      } else {
         this.vy += gravity;
         this.y += this.vy;
       }

      // EFECTO ASCENSOR


      this.y += this.dy

      // MOVER DER/IZ
      this.x += this.dx


      // SALTO
      // this.y -= this.dy
    }
    
  
    animateImg(framesCounter) {
  
      if (framesCounter % 5 === 0) {
        this.img.frameIndex += 1;
        if (this.img.frameIndex > this.img.frames - 1) this.img.frameIndex = 0;
      }
    }

}

