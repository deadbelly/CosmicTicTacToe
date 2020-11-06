var gameBoard = document.querySelector('.game-board')
var squares = document.querySelectorAll('.square')
var turnDisplay = document.querySelector('.turn-display')

var game

window.addEventListener('load', loadGame)
gameBoard.addEventListener('click', addToken)

function loadGame() {
  game = new Game()
  game.newGame()
  updateTurnDisplay()
}

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length)
}

function addToken(event){
  var clickedSquareId = event.target.closest('.square').id

  if (!game.boardState[clickedSquareId]) {
    game.boardState[clickedSquareId] = game.turn.token
    game.passTurn()
    updateGameBoard()
    updateTurnDisplay()
  }
}

function updateTurnDisplay() {
  turnDisplay.innerText = `${game.turn.token}'s TURN`
}

function updateGameBoard() {
  for (var i = 0; i < squares.length; i++) {
    if(game.boardState[squares[i].id]){
      squares[i].innerText = game.boardState[squares[i].id]
    }
  }
}
