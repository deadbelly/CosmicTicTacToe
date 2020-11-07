class Game {
  constructor() {
    this.players = []
    this.boardState = {}
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

  checkForWin() {
    if (
      ((this.boardState.A1) && (this.boardState.A1 === this.boardState.A2) && (this.boardState.A1 === this.boardState.A3)) ||
      ((this.boardState.A1) && (this.boardState.A1 === this.boardState.B1) && (this.boardState.A1 === this.boardState.C1)) ||
      ((this.boardState.A1) && (this.boardState.A1 === this.boardState.B2) && (this.boardState.A1 === this.boardState.C3)) ||
      ((this.boardState.B1) && (this.boardState.B1 === this.boardState.B2) && (this.boardState.B1 === this.boardState.B3)) ||
      ((this.boardState.C1) && (this.boardState.C1 === this.boardState.C2) && (this.boardState.C1 === this.boardState.C3)) ||
      ((this.boardState.C1) && (this.boardState.C1 === this.boardState.B2) && (this.boardState.C1 === this.boardState.A3)) ||
      ((this.boardState.A2) && (this.boardState.A2 === this.boardState.B2) && (this.boardState.A2 === this.boardState.C2)) ||
      ((this.boardState.A3) && (this.boardState.A3 === this.boardState.B3) && (this.boardState.A3 === this.boardState.C3))
    ) {
      return true
    }
  }

  checkForDraw() {
    if (Object.keys(this.boardState).length === 9) {
      return true
    }
  }

  resetBoard() {
    this.boardState = {}
  }

  newPlayers() {
    this.players.push(new Player(1, '✨'))
    this.players.push(new Player(2, '🌙'))
    var randomIndex = getRandomIndex(this.players)
    this.activePlayerToken = this.players[randomIndex].token
    this.activePlayerIndex = randomIndex
  }
}
