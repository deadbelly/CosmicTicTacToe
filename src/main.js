var gameBoard = document.querySelector('.game-board')
var squares = document.querySelectorAll('.game-board__square')
var turnDisplay = document.querySelector('.turn-display')
var winCounters = document.querySelectorAll('.wins__counter')
var music = document.querySelector('.music')
var tokenSound1 = document.querySelector('.token-sound-1')
var tokenSound2 = document.querySelector('.token-sound-2')
var winSound = document.querySelector('.win-sound')
var resetButton = document.querySelector('.button__reset')
var audioButton = document.querySelector('.button__audio')
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

function addToken(event){
  var squareIndex = event.target.closest('.game-board__square').dataset.index
  if (!game.boardState[squareIndex]) {
    game.boardState[squareIndex] = game.activePlayerToken
    return true
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
  selectAndPlaySound()
  updateTurnDisplay()
  setTimeout(endGame, 3000)
}

function validMoveHelper() {
  updateGameBoard()
  selectAndPlaySound()
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
      if(winCounters[i].dataset.playerId == game.players[j].id) {
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

function selectAndPlaySound() {
  if (game.activePlayerToken === '✨') {
    tokenSound1.play()
  } else {
    tokenSound2.play()
  }
}

function changeMuteStatus() {
  for (var i = 0; i < sounds.length; i++) {
    sounds[i].muted = !sounds[i].muted
    sounds[i].volume = 0.25
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
