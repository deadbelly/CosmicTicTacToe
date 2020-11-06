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
