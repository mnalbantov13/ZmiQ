let canvas = document.getElementById("canvas");
let canvas1 = document.getElementById("canvas1");
let context = canvas.getContext("2d");
let ctx = canvas1.getContext("2d");


// Size of each square
const squareSize = 40;

// Initial position of the snake
let snake = [{x: 10, y: 10}, {x: 9, y: 10}];

// Initial direction of the snake
let direction = "right";

// Position of the food
let foodLocation = {x: Math.floor(Math.random() * canvas.width / squareSize), y: Math.floor(Math.random() * canvas.height / squareSize)};

//To avoid two keys being pressed at the same time
let changingDirection = false;

// Score counter
let score = 0;

let currentHead;

const eatAudio = new Audio('Audio/Eat1.m4a');

const crashAudio = new Audio('Audio/Crash2.m4a');

const boardPic = new Image();
boardPic.src = 'Images/BoardFigma.png';

const foodPic = new Image();
foodPic.src = 'Images/Apple.png'

const snakeHeadPicRight = new Image();
snakeHeadPicRight.src = 'Images/SnakeHeadRight.png'

const snakeHeadPicUp = new Image();
snakeHeadPicUp.src = 'Images/SnakeHeadUp.png'

const snakeHeadPicDown = new Image();
snakeHeadPicDown.src = 'Images/SnakeHeadDown.png'

const snakeHeadPicLeft = new Image();
snakeHeadPicLeft.src = 'Images/SnakeHeadLeft.png'

const bodyPic = new Image();
bodyPic.src = 'Images/Body.png'

const scorePic = new Image();
scorePic.src= 'Images/Score.png'


// Main update loop
 function update() {

// Clear the canvas
context.clearRect(0, 0, canvas.width, canvas.height);

// Draw the background image
context.drawImage(boardPic, 0, 0, canvas.width, canvas.height);

 let currentHead = { x: snake[0].x, y: snake[0].y };

  // Snake movement 
  switch (direction) 
  {
    case "up":
      currentHead.y -= 1;
      break;
    case "down":
      currentHead.y += 1;
      break;
    case "left":
      currentHead.x -= 1;
      break;
    case "right":
      currentHead.x += 1;
      break;
  }
  snake.unshift(currentHead);

  // Check for collision with the food
  if (currentHead.x == foodLocation.x && currentHead.y == foodLocation.y) {
    foodLocation = {x: Math.floor(Math.random() * canvas.width / squareSize), y: Math.floor(Math.random() * canvas.height / squareSize)};
    score++; // Increase the score when the snake eats the food
    eatAudio.play();
  } else {
    snake.pop();
  }

  // Check for collision with the walls
  if (currentHead.x < 0 || currentHead.y < 0 || currentHead.x >= canvas.width / squareSize || currentHead.y >= canvas.height / squareSize) {
    crashAudio.play();
    clearInterval(intervalId);
    alert("Wall collision! Your score: " + score);
  }

  // Check for collision with the snake's body
  for (var i = 1; i < snake.length; i++) {
    if (currentHead.x == snake[i].x && currentHead.y == snake[i].y) {
      crashAudio.play();
      clearInterval(intervalId);
      alert("You hit your body! Your score: " + score);
    }
  }

  //Snake filling
  switch(direction)
  {
    case "right":
      context.drawImage(snakeHeadPicRight,snake[0].x * squareSize, snake[0].y * squareSize, squareSize, squareSize)
  break;
  case "left":
    context.drawImage(snakeHeadPicLeft,snake[0].x * squareSize, snake[0].y * squareSize, squareSize, squareSize)
  break;
  case "up":
  
  context.drawImage(snakeHeadPicUp,snake[0].x * squareSize, snake[0].y * squareSize, squareSize, squareSize)

  break;
  case "down":
      context.drawImage(snakeHeadPicDown,snake[0].x * squareSize, snake[0].y * squareSize, squareSize, squareSize)
    break;
  }
  for (var i = 1; i < snake.length; i++)
   {
    context.drawImage(bodyPic,snake[i].x * squareSize, snake[i].y * squareSize, squareSize, squareSize)
  }

  // Food filling 
  context.drawImage(foodPic,foodLocation.x*squareSize,foodLocation.y*squareSize)

  // Display the score
  
  ctx.drawImage(scorePic,0 , 0, 160, 120);
  ctx.fillStyle = "black";
  ctx.font = "50px Rockwell";
  ctx.fillText(score,100,80);
  


  changingDirection = false;
}

// Start the update loop
let intervalId = setInterval(update, 80);


// Check for keyboard events to change the direction of the snake
document.addEventListener("keydown", function(change) {
    console.log("key detected")
    if (!changingDirection){
    changingDirection = true;
  switch (change.keyCode) {
    case 37: // left arrow ID
    console.log("left arrow");   
    if (direction!="right") {
        direction = "left";
      }
      break;

    case 38: // up arrow ID
    console.log("up arrow")
    if (direction!="down") {
    direction = "up";
    }
    break;
    
    case 39: // right arrow ID
    console.log("right arrow")
    if (direction!="left") {
    direction = "right";
    }
    break;
    
    case 40: // down arrow ID
    console.log("down arrow")
    if (direction!="up") {
    direction = "down";
    }
    break;
  }


        }
        }
        );
    

    



     
    
