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
let score = 0;
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

function startingGame() {};
function nextTIck() {};
function clearBoard() {};
function createFood() {};
function drawFood() {};
function moveSnake() {};
function drawSnake() {};
function changeDirection() {};
function checkGameOver() {};
function displayGameOver() {};
function resetGame() {};
