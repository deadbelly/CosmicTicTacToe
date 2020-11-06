var gameBoard = document.querySelector('.game-board')
var squares = document.querySelectorAll('.square')
var turnDisplay = document.querySelector('.turn-display')

var game

window.addEventListener('load', loadGame)
gameBoard.addEventListener('click', processMove)

function loadGame() {
  game = new Game()
  game.newGame()
  updateTurnDisplay('\'s TURN')
}

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length)
}

function addToken(event){
  var clickedSquareId = event.target.closest('.square').id

  if (!game.boardState[clickedSquareId]) {
    game.boardState[clickedSquareId] = game.turn.token
    return true
  }
}

function processMove(event) {
  if (addToken(event)){
    if (game.checkForWin()) {
      updateGameBoard()
      updateTurnDisplay(' WINS!')
    } else {
      updateGameBoard()
      game.passTurn()
      updateTurnDisplay('\'s TURN')
    }
  }
}


function updateTurnDisplay(message) {
  turnDisplay.innerText = `${game.turn.token}${message}`
}

function updateGameBoard() {
  for (var i = 0; i < squares.length; i++) {
    if(game.boardState[squares[i].id]){
      squares[i].innerText = game.boardState[squares[i].id]
    }
  }
}
