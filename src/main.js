var gameBoard = document.querySelector('.game-board')
var squares = document.querySelectorAll('.square')
var turnDisplay = document.querySelector('.turn-display')
var winCounters = document.querySelectorAll('.win-counter')
var music = document.querySelector('.music')
var tokenSound = document.querySelector('.token-sound')
var moonSound = document.querySelector('.moon-sound')
var winSound = document.querySelector('.win-sound')
var resetButton = document.querySelector('.reset-button')
var audioButton = document.querySelector('.audio-button')
var sounds = document.querySelectorAll('audio')

var game

window.addEventListener('load', loadGame)
gameBoard.addEventListener('click', processMove)
resetButton.addEventListener('click', resetGame)
audioButton.addEventListener('click', toggleAudio)

function loadGame() {
  if (localStorage.getItem('game') === null) {
    setUpNewGame()
  } else {
    loadStoredGame()
  }
  changeMuteStatus(true)
}

function setUpNewGame() {
  game = new Game()
  game.newPlayers()
  updateGameBoard()
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
  winSound.play()
  updateTurnDisplay(' WINS!')
  setTimeout(endGame, 3000)
}

function drawHelper() {
  updateGameBoard()
  tokenSound.play()
  updateTurnDisplay()
  setTimeout(endGame, 3000)
}

function validMoveHelper() {
  updateGameBoard()
  tokenSound.play()
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
    squares[i].innerText = game.boardState[i]
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

function resetGame() {
  localStorage.removeItem('game')
  setUpNewGame()
}

function startMusic() {
    music.volume = 1
  if (music.paused){
    music.loop = true
    music.play()
  }
}

// function selectAndPlaySound() {
//   if (game.activePlayerToken === '✨') {
//     starSound.play()
//   } else {
//     moonSound.play()
//   }
// }

function changeMuteStatus() {
  for (var i = 0; i < sounds.length; i++) {
    sounds[i].muted = !sounds[i].muted
    sounds[i].volume = 0.2
  }
}

function toggleAudio() {
  changeMuteStatus()
  startMusic()
  toggleAudButText()
}

function toggleAudButText() {
  if (music.muted){
    audioButton.innerText = 'UNMUTE'
  } else {
    audioButton.innerText = 'MUTE'
  }
}
