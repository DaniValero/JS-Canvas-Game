class Player {
    constructor(w, h, ctx, keys) {
      this.canvasW = w;
      this.canvasH = h;
      this.ctx = ctx;
      this.keys = keys;
      this.x = this.canvasW * 0.5;
  
      // guardar posición original (suelo)
      this.y0 = this.canvasH * 0.5;
      this.y = this.y0;
  
      this.img = new Image();
      this.img.src = "img/sprite.png";
  
      // número de imágenes diferentes
      this.img.frames = 6;
      this.img.frameIndex = 0;
  
      // medidas de la imagen a representar en el canvas
      this.w = 500;
      this.h = 100;
  
      this.setListeners();
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
  
    // setListeners() {
    //   document.onkeydown = function(event) {
    //     if (event.keyCode === this.keys.TOP_KEY && this.y == this.y0) {
    //       this.y -= 5;
    //       this.vy -= 10;
    //     } else if (event.keyCode == this.keys.SPACE) {
    //       this.shoot();
    //     }
    //   }.bind(this);
    // }
  
    // shoot() {
    //   var bullet = new Bullet(
    //     this.x + this.w,
    //     this.y + this.h / 2,
    //     this.y0,
    //     this.h,
    //     this.ctx
    //   );
  
    //   this.bullets.push(bullet);
    // }
  
    animateImg(framesCounter) {
      if (framesCounter % 6 === 0) {
        this.img.frameIndex += 1;
  
    
        if (this.img.frameIndex > 2) this.img.frameIndex = 0;
      }
    }
  
    // move() {
    //   // Aumenta la velocidad en el eje y.
    //   var gravity = 0.4;
  
    //   // solo salta cuando el personaje está en el suelo
    //   if (this.y >= this.y0) {
    //     this.vy = 1;
    //     this.y = this.y0;
    //   } else {
    //     this.vy += gravity;
    //     this.y += this.vy;
    //   }
    // }
}
