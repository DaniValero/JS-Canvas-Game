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

      this.bullets = []

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

      this.bullets = this.bullets.filter(bullet => {
        return bullet.x < this.canvasW;
      });
  
      this.bullets.forEach(function(bullet) {
        bullet.draw();
        bullet.move();
      });
  
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

        // DISPARO DERECHA
        if (event.keyCode == this.keys.D) {
          this.shoot()
        }
        // DISPARO IZQDA
        if (event.keyCode == this.keys.A) {
          this.shootLeft()
          
        }

      }.bind(this);

      document.onkeyup = function(event) {
        if (event.keyCode == this.keys.RIGHT_ARROW) {
          this.dx = 0

          this.img.src = "images/idle-Sheet.png"
          this.img.frames = 8;
          this.img.frameIndex = 0;
        }

        if (event.keyCode == this.keys.LEFT_ARROW) {
          this.dx = 0
          this.img.src = "images/idle-Sheet.png"
          this.img.frames = 8;
          this.img.frameIndex = 0;
        }
     

        if (event.keyCode == this.keys.SPACE) {
        

          // this.img.src = "images/idle-Sheet.png"
          // this.img.frames = 8;
          // if (this.img.frameIndex > 7) this.img.frameIndex = 0;
    
          // this.vy = 1
         
        }

        if (event.keyCode == this.keys.CONTROL) {
          this.img.src = "images/idle-Sheet.png"
          this.img.frames = 8;
          this.img.frameIndex = 0;
        }
      }.bind(this);
    }

    shoot() {
      var bullet = new Bullet(
        this.x + this.w,
        this.y + this.h / 2,
        this.y0,
        this.h,
        this.vx = 15,
        this.ctx
      );
  
      this.bullets.push(bullet);
    }

    shootLeft() {
      var bullet = new Bullet(
        this.x,
        this.y + this.h / 2,
        this.y0,
        this.h,
        this.vx = -10,
        this.ctx
      );
    
      this.bullets.push(bullet);
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
    }
    
  
    animateImg(framesCounter) {
  
      if (framesCounter % 5 === 0) {
        this.img.frameIndex += 1;
        if (this.img.frameIndex > this.img.frames - 1) this.img.frameIndex = 0;
      }
    }

}

