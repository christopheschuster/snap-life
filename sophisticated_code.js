/* 
Filename: sophisticated_code.js
Description: This code demonstrates a sophisticated implementation of a web-based game. It includes complex algorithms, object-oriented design, and advanced user interaction.

Note: Due to the length of the code, it is not advisable to execute it directly in this text box. Instead, please copy and run it in a JavaScript runtime environment or a browser console.

*/

// Game Constants
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const ENEMY_SIZE = 30;

// Game Objects
let canvas, context, player, enemies;

// Player Class
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
  }

  draw() {
    context.fillStyle = "green";
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  move(direction) {
    switch (direction) {
      case "up":
        this.y -= 10;
        break;
      case "down":
        this.y += 10;
        break;
      case "left":
        this.x -= 10;
        break;
      case "right":
        this.x += 10;
        break;
    }
  }
}

// Enemy Class
class Enemy {
  constructor() {
    this.x = Math.random() * CANVAS_WIDTH;
    this.y = Math.random() * CANVAS_HEIGHT;
  }

  draw() {
    context.fillStyle = "red";
    context.fillRect(this.x, this.y, ENEMY_SIZE, ENEMY_SIZE);
  }

  update() {
    const dx = player.x - this.x;
    const dy = player.y - this.y;
    const distance = Math.sqrt(dx*dx + dy*dy);
    
    if (distance < ENEMY_SIZE) {
      // Handle collision with player
      gameOver();
    }
    
    // Move towards player
    this.x += dx / 100;
    this.y += dy / 100;
  }
}

// Initialize Game
function init() {
  canvas = document.createElement("canvas");
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  context = canvas.getContext("2d");
  document.body.appendChild(canvas);

  player = new Player(CANVAS_WIDTH / 2 - 25, CANVAS_HEIGHT / 2 - 25);
  enemies = [];

  for (let i = 0; i < 10; i++) {
    enemies.push(new Enemy());
  }

  requestAnimationFrame(update);
}

// Game Loop
function update() {
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  
  player.draw();
  
  for (let enemy of enemies) {
    enemy.draw();
    enemy.update();
  }
  
  requestAnimationFrame(update);
}

// Game Over
function gameOver() {
  context.font = "50px Arial";
  context.fillStyle = "white";
  context.fillText("Game Over", CANVAS_WIDTH/2 - 100, CANVAS_HEIGHT/2);
}

// User Interaction
document.addEventListener("keydown", function(e) {
  if (e.key === "ArrowUp" || e.key === "w") {
    player.move("up");
  } else if (e.key === "ArrowDown" || e.key === "s") {
    player.move("down");
  } else if (e.key === "ArrowLeft" || e.key === "a") {
    player.move("left");
  } else if (e.key === "ArrowRight" || e.key === "d") {
    player.move("right");
  }
});

// Start Game
init();