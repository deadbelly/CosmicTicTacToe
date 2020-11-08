class Player {
  constructor(id, token) {
    this.id = id
    this.token = token
    this.wins = 0
  }

  loadFromStorage(storageData) {
    this.id = storageData.id
    this.token = storageData.token
    this.wins = storageData.wins
  }

  recordWin() {
    this.wins ++
  }
}
