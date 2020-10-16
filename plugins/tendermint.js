import Tendermint from '@/lib/tendermint'
import Btsg from '@/lib/btsg'

export default (ctx, inject) => {
  const tm = new Tendermint('bitsong-testnet-4', 'ws://rpc.testnet4.bitsong.network:26657/websocket')
  inject('tm', tm)
  ctx.$tm = tm

  const btsg = new Btsg('https://lcd.testnet4.bitsong.network')
  inject('btsg', btsg)
  ctx.$btsg = btsg

  ctx.app.store.dispatch(`app/startListening`)
  ctx.app.store.dispatch(`validators/getAll`)
}
