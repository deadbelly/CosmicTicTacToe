class Game {
  constructor() {
    this.players = []
    this.boardState = {}
    this.turn
  }

  saveToStorage() {
  }

  loadFromStorage() {
  }

  passTurn() {
    for (var i = 0; i < this.players.length; i++) {
      if (this.players[i].id !== this.turn.id) {
        this.turn = this.players[i]
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
      console.log('win')
      return true
    }
  }

  checkForDraw() {
  }

  recordWin() {
  }

  newGame() {
    this.players.push(new Player(1, '✨'))
    this.players.push(new Player(2, '🌙'))

    this.turn = this.players[getRandomIndex(this.players)]
  }
}
