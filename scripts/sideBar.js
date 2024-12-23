import { startingGame, resetSnake, running } from "./snakeGame.js";

const startBtn = document.querySelector('#start-game');
const options = document.querySelectorAll('.options');
const messageError = document.querySelector('.difficulty-message');

// export the speed that we pick from options to change speed of snake

export let speed;

options.forEach(option => {
  option.addEventListener('click', () => {

    // to not choose the speed when game is playing
    if(running) return;

    speed = option.getAttribute('speed');
  })
});

startBtn.addEventListener('click', () => {

  // to not start the game when playing
  if(running) return;

  if(speed) {
    resetSnake();
    startingGame();
  } else {
    messageError.classList.add('is-message-visible')
  }

})

setInterval(() => {
  messageError.classList.remove('is-message-visible')
}, 3000)
