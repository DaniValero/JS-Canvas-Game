var Game = {
    canvas: undefined,
    ctx: undefined,
    fps: 60,
    scoreBoard: undefined,
    keys: {
        LEFT_ARROW: 37,
        RIGHT_ARROW: 39,
        SPACE: 32
    },

    init: function(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.start();
    },

    start: function() {
        this.fps = 60;
    
        this.reset();
    
        this.interval = setInterval(() => {
          this.clear();
          
    
          this.framesCounter++;
    
          if (this.framesCounter > 1000) {
            this.framesCounter = 0;
          }
          if (this.framesCounter % Math.floor(Math.random() * 500) === 0) {
            this.generateObstacle();
          }

          if(this.isCollisionBottom()) {

            this.player.vy = 0.4;
          }

          if(this.isCollisionTop()) {
            console.log("plataforma")
            this.player.yp = 485 - this.player.h - 50
            this.player.y = this.player.yp
          } 
    
          this.drawAll()
          this.moveAll()
        }, 1000 / this.fps);
    },

    // isCollisionRight: function() {
    //   return this.obstacles.some(obstacle => {
    //     return (
    //       this.player.x >= obstacle.x + obstacle.w
    //     );
    //   });
    // },

    // isCollisionLeft: function() {
    //   return this.obstacles.some(obstacle => {
    //     return (
    //       this.player.x + this.player.w >= obstacle.x
    //     );
    //   })
    // },

    // isCollisionBottom: function() {
    //   return this.obstacles.some(obstacle => {
    //     return (
    //       this.player.y <= obstacle.y + 15
    //     );
    //   })
    // },

    isCollisionTop: function() {
      return this.obstacles.some(obstacle => {
        return (

          
          this.player.y + this.player.h >= obstacle.y &&
          this.player.y < obstacle.y &&
          this.player.x >= obstacle.x + obstacle.w &&
          this.player.x + this.player.w >= obstacle.x &&
          this.player.y < obstacle.y &&
          this.player.vy >= 0

          
        );
      })
    },


    isCollisionBottom: function() {
        return this.obstacles.some(obstacle => {
            
            return (

                this.player.x + this.player.w >= obstacle.x &&
                this.player.x <= obstacle.x + obstacle.w &&
                this.player.y <= obstacle.y + obstacle.h &&
                this.player.y > obstacle.y &&
                this.player.vy < 0
            );
        })
    },

    reset: function() {
        this.background = new Background(this.canvas.width, this.canvas.height, this.ctx);
        this.player = new Player(this.canvas.width, this.canvas.height, this.ctx, this.keys);
        this.framesCounter = 0;
        this.obstacles = [];
    },

    clear: function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    drawAll: function() {
        this.background.draw()
        this.player.draw(this.framesCounter)
        this.obstacles.forEach(function(obstacle) {
            obstacle.draw();
            
          });
    },

    moveAll: function() {
        this.background.move();
        this.player.move();
        this.obstacles.forEach(function(obstacle) {
            obstacle.move();
          });
    },

    generateObstacle: function() {
        this.obstacles.push(
            new Obstacle(this.canvas.width, this.player.y0, this.player.h, this.ctx)
        );
    }
}

