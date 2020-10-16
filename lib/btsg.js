import fetch from "node-fetch"
import axios from 'axios'

class Btsg {
  constructor(url) {
    this.url = url
    this.rpc = axios.create({
      baseURL: '/rpc/'
    })
  }

  getTotalSupply() {
    return fetch(`${this.url}/supply/total`).then(response =>
      response.json()
    )
  }

  getCommunityPool() {
    return fetch(`${this.url}/distribution/community_pool`).then(response =>
      response.json()
    )
  }

  getInflation() {
    return fetch(`${this.url}/minting/inflation`).then(response =>
      response.json()
    )
  }

  getValidators() {
    return fetch(`${this.url}/staking/validators`).then(response =>
      response.json()
    )
  }

  async getVotingPower() {
    const vals = await this.rpc.get(`validators`)
    console.log(vals)
    // return  .then(response => {
    //   let vals = response.json()
    //   vals = vals.result.validators

    //   return vals.reduce((a, b) => Number(a) + Number(b), 0)
    // }
    // )
  }
}

export default Btsg
