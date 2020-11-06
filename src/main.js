var gameBoard = document.querySelector('.game-board')

gameBoard.addEventListener('click', addToken)

var game

window.addEventListener('load', loadGame)

function loadGame() {
  game = new Game()
  game.newGame()
}

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length)
}

function addToken(){

}
