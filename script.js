const sprites = new Image();
sprites.src = "./snake-graphics.png";

let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
// snake[0] = {
//   x: 8 * box,
//   y: 8 * box
// }

snake[0] = {
  x: 8 * box,
  y: 8 * box,
  direction: {
    x: 1,
    y: 0
  }
}

// let direction = "right";

let foodLocation = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box
}

function createBG() {
  context.fillStyle = "lightgreen";
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function createSnake() {
  // for (i = 0; i < snake.length; i++) {
  //   context.fillStyle = "green";
  //   context.fillRect(snake[i].x, snake[i].y, box, box);
  // }

  //Cria cabeça
  let spriteHeadPosition = {
    x: 254,
    y: 0,
  }

  if (snake[0].direction.x === 1)
    spriteHeadPosition = { x: 256, y: 0 } //head sprite right
  if (snake[0].direction.x === -1)
    spriteHeadPosition = { x: 192, y: 64 } //head sprite left
  if (snake[0].direction.y === 1)
    spriteHeadPosition = { x: 256, y: 64 } //head sprite down
  if (snake[0].direction.y === -1)
    spriteHeadPosition = { x: 192, y: 0 } //head sprite up

  context.drawImage(
    sprites,
    spriteHeadPosition.x, spriteHeadPosition.y,
    64, 64,
    snake[0].x, snake[0].y,
    box, box
  );

  context.drawImage(
    sprites,
    254, 0,
    64, 64,
    snake[0].x, snake[0].y,
    box, box
  );

  // cria o resto do corpo 
  for (i = 1; i < snake.length - 1; i++) {
    context.fillStyle = "green";
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // cria calda
  if (snake.length > 1) {
    //cria calda
    let spriteTailPosition = {
      x: 256,
      y: 128
    }

    if (snake[snake.length - 1].direction.x > 0)
      spriteTailPosition = { x: 256, y: 128 }
    if (snake[snake.length - 1].direction.x < 0)
      spriteTailPosition = { x: 192, y: 192 }
    if (snake[snake.length - 1].direction.y > 0)
      spriteTailPosition = { x: 256, y: 192 }
    if (snake[snake.length - 1].direction.y < 0)
      spriteTailPosition = { x: 192, y: 128 }

    context.drawImage(
      sprites,
      spriteTailPosition.x, spriteTailPosition.y,
      64, 64,
      snake[snake.length - 1].x, snake[snake.length - 1].y,
      box, box
    );
  }
}

function createFood() {
  // context.fillStyle = "red";
  // context.fillRect(foodLocation.x, foodLocation.y, box, box);

  context.drawImage(
    sprites,           //spritesheet
    0, 192,            // x = 0 y = 192 (64+64+64) posição inicial do recorte
    64, 64,            // tamanho do recorte no nosso spritesheet
    food.x, food.y,    //posição da comida
    box, box            // tamanho da comida
  );
}

document.addEventListener("keydown", update);

function update(event) {
  // if (event.keyCode == 37 && direction != "right") {
  //   direction = "left";
  // }
  // if (event.keyCode == 38 && direction != "down") {
  //   direction = "up";
  // }
  // if (event.keyCode == 39 && direction != "left") {
  //   direction = "right";
  // }
  // if (event.keyCode == 40 && direction != "up") {
  //   direction = "down";
  // }

  if (event.keyCode == 37 && snake[0].direction.x != 1) {
    snake[0].direction = { x: -1, y: 0 }; //left  
  }
  if (event.keyCode == 38 && snake[0].direction.y != 1) {
    snake[0].direction = { x: 0, y: -1 }; //up  
  }
  if (event.keyCode == 39 && snake[0].direction.x != -1) {
    snake[0].direction = { x: 1, y: 0 }; //right  
  }
  if (event.keyCode == 40 && snake[0].direction.y != -1) {
    snake[0].direction = { x: 0, y: 1 }; //down
  }
}

function startGame() {

  // if (snake[0].x > 15 * box && direction == "right") {
  //   snake[0].x = 0;
  // }
  // if (snake[0].x < 0 && direction == "left") {
  //   snake[0].x = 16 * box;
  // }
  // if (snake[0].y > 15 * box && direction == "down") {
  //   snake[0].y = 0;
  // }
  // if (snake[0].y < 0 && direction == "up") {
  //   snake[0].y = 16 * box;
  // }

  if (snake[0].x > 15 * box && snake[0].direction.x == 1) snake[0].x = 0;
  if (snake[0].x < 0 && snake[0].direction.x == -1) snake[0].x = 16 * box;
  if (snake[0].y > 15 * box && snake[0].direction.y == 1) snake[0].y = 0;
  if (snake[0].y < 0 && snake[0].direction.y == -1) snake[0].y = 16 * box;

  for (i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval[game];
      alert("Game Over !!!")
    }
  }

  createBG();
  createSnake();
  createFood();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // if (direction == "right") {
  //   snakeX += box;
  // }
  // if (direction == "left") {
  //   snakeX -= box;
  // }
  // if (direction == "up") {
  //   snakeY -= box;
  // }
  // if (direction == "down") {
  //   snakeY += box;
  // }

  if (snake[0].direction.x == 1) snakeX += box;
  if (snake[0].direction.x == -1) snakeX -= box;
  if (snake[0].direction.y == -1) snakeY -= box;
  if (snake[0].direction.y == 1) snakeY += box;

  if (snakeX != foodLocation.x || snakeY != foodLocation.y) {
    snake.pop();
  } else {
    foodLocation.x = Math.floor(Math.random() * 15 + 1) * box,
      foodLocation.y = Math.floor(Math.random() * 15 + 1) * box
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
    direction: {
      x: snake[0].direction.x,
      y: snake[0].direction.y
    }
  }

  snake.unshift(newHead);

  if (snakeX != food.x || snakeY != food.y) {
    snake.pop(); //pop tira o último elemento da lista
  } else {
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
  }
}

let game = setInterval(startGame, 100);