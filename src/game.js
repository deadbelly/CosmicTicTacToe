class Game {
  constructor() {
    this.players = []
    this.boardState = ['','','','','','','','','']
    this.winStates = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
    this.activePlayerToken
    this.activePlayerIndex
  }

  saveToStorage() {
    localStorage.setItem('game', JSON.stringify(this))
  }

  loadFromStorage(storageData) {
    var parsedObject = JSON.parse(storageData)
    this.loadPlayersFromStorage(parsedObject.players)
    this.boardState = parsedObject.boardState
    this.activePlayerToken = parsedObject.activePlayerToken
    this.activePlayerIndex = parsedObject.activePlayerIndex
  }

  loadPlayersFromStorage(savedArray) {
    for (var i = 0; i < savedArray.length; i++) {
      var blankPlayer = new Player()
      blankPlayer.loadFromStorage(savedArray[i])
      this.players.push(blankPlayer)
    }
  }

  passTurn() {
    for (var i = 0; i < this.players.length; i++) {
      if (i !== this.activePlayerIndex) {
        this.activePlayerIndex = i
        this.activePlayerToken = this.players[i].token
        break
      }
    }
  }

  checkForWin(player) {
    for (var i = 0; i < this.winStates.length; i++) {
      var firstSquare = this.boardState[this.winStates[i][0]]
      var secondSquare = this.boardState[this.winStates[i][1]]
      var thirdSquare = this.boardState[this.winStates[i][2]]

      if (firstSquare && firstSquare === secondSquare && firstSquare === thirdSquare) {
        return true
      }
    }
  }

  checkForDraw() {
    for (var i = 0; i < this.boardState.length; i++) {
      if(!this.boardState[i]){
        return false
      }
    }
    if (!this.checkForWin()){
        return true
    }
  }

  resetBoard() {
    this.boardState = ['','','','','','','','','']
  }

  newPlayers() {
    this.players.push(new Player(1, '✨'))
    this.players.push(new Player(2, '🌙'))
    var randomIndex = getRandomIndex(this.players)
    this.activePlayerToken = this.players[randomIndex].token
    this.activePlayerIndex = randomIndex
  }
}
