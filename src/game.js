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

  addToBoard() {
    return this.turn.token
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
