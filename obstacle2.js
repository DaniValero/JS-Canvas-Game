class Obstacle {
    constructor(w, playerY, playerH, ctx) {
        this.ctx = ctx;
        this.w = 200;
        this.h = 20;
        this.dx = 5;
        this.x = w;
        this.y = playerY - 50
      }
  
    draw() {
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(this.x, this.y, this.w, this.h);
    }
  
    move() {
      this.x -= this.dx;
    }
  }

//   class Obstacle {
//     constructor(x, y, w, h, ctx) {
//         this.x = 
//       }
  
//     draw() {
//       this.ctx.fillStyle = "black";
//       this.ctx.fillRect(this.x, this.y, this.w, this.h);
//     }
  
//     move() {
//       this.x -= this.dx;
//     }
//   }