var Game = {
    canvas: undefined,
    ctx: undefined,
    fps: 60,
    scoreBoard: undefined,
    keys: {},

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
    
          this.drawAll()
          this.moveAll()
        }, 1000 / this.fps);
    },

    reset: function() {
        this.background = new Background(this.canvas.width, this.canvas.height, this.ctx);
    },

    clear: function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    drawAll: function() {
        this.background.draw()
        console.log("background")
    },

    moveAll: function() {
        this.background.move();
    }

}