var gameBoard = document.querySelector('.game-board')
var squares = document.querySelectorAll('.square')
var turnDisplay = document.querySelector('.turn-display')
var winCounters = document.querySelectorAll('.win-counter')

var game

window.addEventListener('load', loadGame)
gameBoard.addEventListener('click', processMove)

function loadGame() {
  game = new Game()
  game.newGame()
  updateTurnDisplay('\'s TURN')
  updateWinCounters()
}

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length)
}

function addToken(event){
  var clickedSquareId = event.target.closest('.square').id

  if (!game.boardState[clickedSquareId]) {
    game.boardState[clickedSquareId] = game.activePlayerToken
    return true
  }
}

function processMove(event) {
  if (addToken(event)) {
    if (game.checkForWin()) {
      gameBoard.removeEventListener('click', processMove)
      game.players[game.activePlayerIndex].recordWin()
      updateGameBoard()
      updateTurnDisplay(' WINS!')
      setTimeout(resetAfterWin, 3000)
    } else {
      updateGameBoard()
      game.passTurn()
      updateTurnDisplay('\'s TURN')
    }
  }
}


function updateTurnDisplay(message) {
  turnDisplay.innerText = `${game.activePlayerToken}${message}`
}

function updateGameBoard() {
  for (var i = 0; i < squares.length; i++) {
    if(game.boardState[squares[i].id]){
      squares[i].innerText = game.boardState[squares[i].id]
    } else {
      squares[i].innerText = ''
    }
  }
}

function resetAfterWin() {
  updateWinCounters()
  game.resetBoard()
  updateGameBoard()
  game.passTurn()
  updateTurnDisplay('\'s TURN')
  gameBoard.addEventListener('click', processMove)
}

function updateWinCounters() {
  for (var i = 0; i < winCounters.length; i++) {
    for (var j = 0; j < game.players.length; j++) {
      if(winCounters[i].id == game.players[j].id) {
        winCounters[i].innerText = game.players[j].wins
      }
    }
  }
}
