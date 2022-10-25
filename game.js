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
          if (this.framesCounter % 100 === 0) {
            this.generateObstacle();
          }
    
          this.drawAll()
          this.moveAll()
        }, 1000 / this.fps);
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
          new Obstacle(this.canvas.width, this.player.y, this.player.h, this.ctx)
        );
    }
}