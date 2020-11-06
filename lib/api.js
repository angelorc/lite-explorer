import fetch from "node-fetch"

class Api {
  constructor(url) {
    this.url = url
    this.limit = 25
  }

  getLatestBlocks() {
    return fetch(`${this.url}/blocks?sort=-height&limit=${this.limit}`).then(response => response.json())
  }

  getLatestTxs() {
    return fetch(`${this.url}/transactions?sort=-timestamp&limit=${this.limit}`).then(response => response.json())
  }

  getBlocks(page = 1, limit = 25) {
    return fetch(`${this.url}/blocks?sort=-height&page=${page}&limit=${limit}`).then(response => response.json())
  }

  getBlock(height) {
    return fetch(`${this.url}/blocks/${height}`).then(response => response.json()).then(response => response.data)
  }

  getTransactions(page = 1, limit = 25) {
    return fetch(`${this.url}/transactions?sort=-height&page=${page}&limit=${limit}`).then(response => response.json())
  }

  getTransactionCount() {
    return fetch(`${this.url}/transactions/count`).then(response => response.json())
  }

  getTransaction(hash) {
    return fetch(`${this.url}/transactions/${hash}`).then(response => response.json())
  }

  getTransactionsByHeight(height) {
    return fetch(`${this.url}/transactions?height=${height}`).then(response => response.json())
  }

  getTransactionsByAccount(address, limit = 100) {
    return fetch(`${this.url}/transactions?signatures[address]=${address}&limit=${limit}`).then(response => response.json())
  }

  getValidator(valoper) {
    return fetch(`${this.url}/validators/${valoper}`).then(response =>
      response.json()
    ).then(response =>
      response.data
    )
  }

  getProposedBlocks(valoper) {
    return fetch(`${this.url}/validators/${valoper}/proposed_blocks`).then(response =>
      response.json()
    )
  }

  getMissedBlocks(valoper) {
    return fetch(`${this.url}/validators/${valoper}/missed_blocks`).then(response =>
      response.json()
    )
  }
}

export default Api
