var gameBoard = document.querySelector('.game-board')
var squares = document.querySelectorAll('.square')
var turnDisplay = document.querySelector('.turn-display')
var winCounters = document.querySelectorAll('.win-counter')

var game

window.addEventListener('load', loadGame)
gameBoard.addEventListener('click', processMove)

function loadGame() {
  if (localStorage.getItem('game') === null) {
    setUpNewGame()
  } else {
    loadStoredGame()
  }
}

function setUpNewGame() {
  game = new Game()
  game.newPlayers()
  updateTurnDisplay('\'s TURN')
  updateWinCounters()
}

function loadStoredGame() {
  game = new Game()
  game.loadFromStorage(localStorage.getItem('game'))
  updateGameBoard()
  updateWinCounters()
  updateTurnDisplay('\'s TURN')
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
      winHelper()
    } else if (game.checkForDraw()){
      drawHelper()
    } else {
      validMoveHelper()
    }
  }
}

function winHelper() {
  gameBoard.removeEventListener('click', processMove)
  game.players[game.activePlayerIndex].recordWin()
  updateGameBoard()
  updateTurnDisplay(' WINS!')
  setTimeout(endGame, 3000)
}

function drawHelper() {
  updateGameBoard()
  updateTurnDisplay()
  setTimeout(endGame, 3000)
}

function validMoveHelper() {
  updateGameBoard()
  game.passTurn()
  updateTurnDisplay('\'s TURN')
  game.saveToStorage()
}

function updateTurnDisplay(message) {
  if (game.checkForDraw() && !game.checkForWin()) {
    turnDisplay.innerText = 'DRAW'
  } else {
    turnDisplay.innerText = `${game.activePlayerToken}${message}`
  }
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

function endGame() {
  if (game.checkForWin()) {
    gameBoard.addEventListener('click', processMove)
  }
  updateWinCounters()
  game.resetBoard()
  updateGameBoard()
  game.passTurn()
  updateTurnDisplay('\'s TURN')
  game.saveToStorage()
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
