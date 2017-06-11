const Gdax = require('gdax')
const orderbookSync = new Gdax.OrderbookSync(['BTC-USD', 'ETH-USD'])
const INTERVAL = 3000
let ready = false
let lastPrint = 0

const toNumber = (num) => parseFloat(num.valueOf())

orderbookSync.socket.on('message', () => {
  const state = orderbookSync.books['BTC-USD'].state()
  if (!ready) {
    ready = state.asks.length > 0
  }
  if (ready) {
    const now = new Date().getTime()
    if (lastPrint + INTERVAL < now) {
      lastPrint = now
      const ask = toNumber(state.asks[0].price)
      const bid = toNumber(state.bids[0].price)
      console.log(ask, bid)
    }
  }
})