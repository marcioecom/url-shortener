const express = require('express')
require('dotenv').config()
const mongoose = require('./database/index')
const ShortUrl = require('./models/shortUrl')

const port = process.env.PORT
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.set('views', process.cwd() + '/src/views')

app.get('/', async (req, res) => {
  const shortUrls = await ShortUrl.find()
  res.render('index', { shortUrls: shortUrls })
})

app.post('/shorturl', async (req, res) => {
  const urlBody = req.body.fullUrl

  const httpRegex = /^(http|https)(:\/\/)/

  if (!httpRegex.test(urlBody)) {
    return res.json({ error: 'invalid url' })
  }

  await ShortUrl.create({ full: urlBody })

  const shortUrl = await ShortUrl.findOne({ full: urlBody })
  // Return response
  res.redirect('/')
})

app.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })

  if (shortUrl == null) return res.sendStatus(404)

  shortUrl.clicks++
  shortUrl.save()

  res.redirect(shortUrl.full)
})

app.listen(port, () => console.log(`Server running on localhost:${port}`))
