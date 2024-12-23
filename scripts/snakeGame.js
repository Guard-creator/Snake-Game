const gameBoard = document.querySelector('#game-board');
const scoreText = document.querySelector('#score');
const recordText = document.querySelector('#record');
const resetBtn = document.querySelector('#reset-game');
const context = gameBoard.getContext('2d');
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height
const boardBackGround = 'grey';
const foodColor = 'red';
const snakeColor = 'lightgreen';
const snakeBorder = 'black';
const unitSize = 25;

let running =  false;
let nextTimeOutId;
let score = 0;
let record = JSON.parse(localStorage.getItem('record')) || 0;
let foodX;
let foodY;
let xVelocity = unitSize;
let yVelocity = 0;
let snake = [

  {x: unitSize * 4, y: 0},
  {x: unitSize * 3, y: 0},
  {x: unitSize * 2, y: 0},
  {x: unitSize, y: 0},
  {x: 0, y: 0},

]

window.addEventListener('keydown', (event) => {
  changeDirection(event);
})

resetBtn.addEventListener('click', resetGame);

startingGame();

function startingGame() {

  running = true;
  scoreText.textContent = score;
  recordText.textContent = record;
  createFood();
  drawFood();
  nextTick();

};

function nextTick() {

  if(running) {
    nextTimeOutId = setTimeout(() => {
      clearBoard();
      drawFood();
      moveSnake();
      drawSnake();
      checkGameOver();
      nextTick();
    }, 75)
  } else {
    displayGameOver();
  }

};

function clearBoard() {

  context.fillStyle = boardBackGround;
  context.fillRect(0, 0, gameHeight, gameWidth)

};

function createFood() {

  function ramdomFood(min, max) {
    const randomNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
    return randomNum;
  }

  foodX =  ramdomFood(0, gameWidth - unitSize);
  foodY =  ramdomFood(0, gameHeight - unitSize);

};

function drawFood() {

  context.fillStyle = foodColor;
  context.fillRect(foodX, foodY, unitSize, unitSize);

}; 

function moveSnake() {

  const head = 
  {x: snake[0].x + xVelocity,
   y: snake[0].y + yVelocity,};

  snake.unshift(head);

  if(snake[0].x === foodX && snake[0].y === foodY) {
    score+=1;
    saveRecord();
    scoreText.textContent = score;
    createFood();
  } else {
    snake.pop();
  }

};

function drawSnake() {

  context.fillStyle = snakeColor;
  context.strokeStle = snakeBorder;
  snake.forEach(snakePart => {
    context.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
    context.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
  })

};

function changeDirection(event) {

  const keyPresses = event.keyCode;

  const right = 37;
  const up = 38;
  const left = 39;
  const down = 40;

  const goingRight = (xVelocity === -unitSize);
  const goingLeft = (xVelocity === unitSize);
  const goingUp = (yVelocity === -unitSize);
  const goingDown = (yVelocity === unitSize);

  switch(true) {

    case(right === keyPresses && !goingLeft):
      xVelocity = -unitSize;
      yVelocity = 0;
      break;
    case(left === keyPresses && !goingRight):
      xVelocity = unitSize;
      yVelocity = 0;
      break;
    case(up === keyPresses && !goingDown):
      xVelocity = 0;
      yVelocity = -unitSize;
      break;
    case(down === keyPresses && !goingUp):
      xVelocity = 0;
      yVelocity = unitSize;
      break;

  }

};

function checkGameOver() {

  switch(true) {
    case(snake[0].x < 0):
      running = false;
      break;
    case(snake[0].x >= gameWidth):
      running = false;
      break;
    case(snake[0].y < 0):
      running = false;
      break;
    case(snake[0].y >= gameHeight):
      running = false;
      break;
  }

  for(let i = 1; i < snake.length; i+=1) {
    if(snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      running = false;
      break;
    }
  }

};

function displayGameOver() {

  context.fillStyle = 'black';
  context.font = '50px monospace';
  context.textAlign = 'center'
  context.fillText('Game Over!', gameWidth / 2, gameHeight / 2);
  running = false;

};

function resetGame() {

  score = 0;
  scoreText.textContent = score;
  xVelocity = unitSize;
  yVelocity = 0;
  snake = [
    {x: unitSize * 4, y: 0},
    {x: unitSize * 3, y: 0},
    {x: unitSize * 2, y: 0},
    {x: unitSize, y: 0},
    {x: 0, y: 0},
  ]
  running = true;
  clearTimeout(nextTimeOutId);
  startingGame();

};

function saveRecord() {

  if(score > record) {
    record+=1;
    recordText.textContent = record;
  } else  {
     return;
  }

  localStorage.setItem('record', JSON.stringify(record));

}
