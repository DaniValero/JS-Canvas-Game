var Game = {
  canvas: undefined,
  ctx: undefined,
  fps: 60,
  scoreBoard: 0,
  keys: {
    LEFT_ARROW: 37,
    RIGHT_ARROW: 39,
    SPACE: 32,
    A: 65,
    D: 68
  },
  randomInt: function randomInt(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  },

  init: function (canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    ScoreBoard.init(this.ctx);
    this.start();
  },

  start: function () {
    this.fps = 60;

    this.reset();

    //this.generateObstacle();
    
   

    this.interval = setInterval(() => {
      this.clear();


      this.framesCounter++;

      this.score += 0.01;

      if (this.framesCounter > 1000) {
        this.framesCounter = 0;
      }
      if (this.framesCounter % 135 === 0) {
        this.generateObstacle();
        this.generateMob();
      }

      if (this.isCollisionBottom()) {
        this.player.vy = -0.01;
      }

      if(this.isCollisionMob()) {
        console.log("Robot")
      }

      if(this.isCollisionMob()) {
        this.gameOver()
      }


      if(this.player.y >= 600) {
        this.gameOver()
      }
      
      // if(this.enemyHit()) {
      //   console.log("bullet")
      // }


      this.player.falling = !this.isCollisionTop();

      this.drawAll()
      this.moveAll()
    }, 1000 / this.fps);
  },

  stop: function() {
    clearInterval(this.interval);
  },

  gameOver: function() {
    this.stop();

    if (confirm("GAME OVER. Play again?")) {
      this.reset();
      this.start();
    }
  },

  // enemyHit: function () {
  //   return this.mobs.some(enemigo => {
  //     return (
  //       bullet.x + bullet.w >= enemigo.x &&
  //       bullet.x <= enemigo.x + enemigo.w &&
  //       bullet.y + bullet.h >= enemigo.y + enemigo.w &&
  //       bullet.y <= enemigo.y + enemigo.h

  //     );
  //   })
  // },

  isCollisionMob: function () {
    return (this.mobs).some(enemigo => {
      return (
        this.player.x + this.player.w >= enemigo.x &&
        this.player.x <= enemigo.x + enemigo.w &&
        this.player.y + this.player.h >= enemigo.y + enemigo.w &&
        this.player.y <= enemigo.y + enemigo.h

      );
    })
  },


  isCollisionBottom: function () {
    return this.obstacles.some(obstacle => {
      return (
        this.player.y <= obstacle.y + obstacle.h &&
        this.player.y + this.player.h >= obstacle.y + obstacle.h &&
        this.player.x + this.player.w >= obstacle.x &&
        this.player.x <= obstacle.x + obstacle.w &&
        this.player.y <= obstacle.y + obstacle.h &&
        this.player.vy < 0
      );
    })
  },

 isCollisionTop: function () {
   return this.obstacles.some(obstacle => {
     return (
       this.player.y + this.player.h >= obstacle.y &&
       this.player.y <= obstacle.y + obstacle.h &&
       this.player.x + this.player.w - 10 >= obstacle.x &&
       this.player.x + 10 <= obstacle.x + obstacle.w &&
       this.player.y <= obstacle.y &&
       this.player.vy > 0 &&
       (this.player.y = obstacle.y - this.player.h + 3)
       
     );
   })
 },





  reset: function () {
    this.background = new Background(this.canvas.width, this.canvas.height, this.ctx);
    this.scoreBoard = ScoreBoard;
    this.score = 0

    // generate 5 first obstacles
    this.obstacles = new Array(5)
      .fill(0.2) 
      .map((v, i) => i * v)
      .reverse()
      .reduce((prevObtacles, crop) => {
        const {width: canvasW, height: canvasH } = this.canvas;
        const obstaclesW = 200

        const prevObstacle = (prevObtacles.length) 
          ? prevObtacles[prevObtacles.length-1] 
          : { x: this.randomInt(0, canvasW - obstaclesW), y: canvasH, w: obstaclesW}
        
        const currentObstacleX = (prevObstacle.x <= canvasW / 3 )
            ? this.randomInt( prevObstacle.x + prevObstacle.w, 
                              prevObstacle.x + prevObstacle.w * 1.25) 
            : this.randomInt( prevObstacle.x - prevObstacle.w, 
                              prevObstacle.x - prevObstacle.w * .75)

        const currentObstacleY = (canvasH * crop) -150
        const currentObstacle = new Obstacle(currentObstacleX, currentObstacleY, this.ctx)

        return [...prevObtacles, currentObstacle];       
      }, [])
         
    this.player = new Player(this.canvas.width, this.canvas.height, this.obstacles[0].x + (this.obstacles[0].w / 2), this.obstacles[0].y , this.ctx, this.keys); 
    
    this.mobs = []
    this.framesCounter = 0;                       
  },

  clear: function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  drawAll: function () {  
    this.background.draw()
    this.player.draw(this.framesCounter)
    this.drawScore();
    
    this.obstacles.forEach(function (obstacle) {
      obstacle.draw();
    })

    this.mobs.forEach(function (enemigo) {
      enemigo.draw(this.framesCounter)
  })
    
  },

  moveAll: function () {
    this.background.move();
    this.player.move();
    this.obstacles.forEach(function (obstacle) {
      obstacle.move();
    });
    this.mobs.forEach(function (enemigo) {
      enemigo.move();
  
    });
  },

  drawScore: function() {
    this.scoreBoard.update(this.score);
  },

  generateObstacle: function () {
    this.obstacles.push(
      new Obstacle(this.randomInt(50, 450), 0, this.ctx)
  );
  },

  generateMob: function() {
    this.mobs.push(
      new Enemigo(this.randomInt(50, 550), 0, this.ctx))
  }
}