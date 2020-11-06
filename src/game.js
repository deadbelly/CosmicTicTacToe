class Game {
  constructor() {
    this.players = []
    this.boardState = {}
    this.activePlayerToken
    this.activePlayerIndex
  }

  saveToStorage() {
  }

  loadFromStorage() {
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
  }

  resetBoard() {
    this.boardState = {}
  }

  newGame() {
    this.players.push(new Player(1, '✨'))
    this.players.push(new Player(2, '🌙'))

    var randomIndex = getRandomIndex(this.players)

    this.activePlayerToken = this.players[randomIndex].token
    this.activePlayerIndex = randomIndex
  }
}
