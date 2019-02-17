const express = require('express')
const cors = require('cors')
const _ = require('lodash')
const app = express()

const { cards } = require('./../mock/cards.json')

app.use(cors())

app.use((req, res, next) => {
  // res.setHeader('Access-Control-Allow-Origin', 'http://192.168.1.104:3000')
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3030')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader("Access-Control-Expose-Headers", "X-HMAC-CSRF, X-Secret, WWW-Authenticate, X-Custom-Header");
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, X-Custom-Header, Content-Disposition, Content-MD5, Content-Type, Custom-Name, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization, X-Access-Token')
  // res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, X-Custom-Header, Content-Disposition, Content-MD5, Content-Type, Custom-Name, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization, X-Access-Token')
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
})

app.get('/api/cards', (req, res) => {
  const { name, type, limit = 20 } = req.query

  if (_.every([name, type], item => item === undefined)) {
    return res.json({ cards: cards.slice(0, limit) })
  }

  res.json({
    cards: _.filter(cards, card => {
      const name = _.toUpper(_.get(req, 'query.name', ''))
      const type = _.toUpper(_.get(req, 'query.type', ''))
      const checkName = _.includes(_.toUpper(card.name), name)
      const checkType = _.includes(_.toUpper(card.type), type)
      return checkName && checkType
    })
  })

})

// app.get('/api/cards/limit/:limit/name/:name/type/:type', (req, res) => {

// })

app.listen(3030, () => console.log('app start @ port 3030'))