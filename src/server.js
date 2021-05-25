import express from 'express'
require('dotenv').config()
import mongoose from './database/index'
import ShortUrl from './models/shortUrl'

const port = process.env.PORT
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', async (req, res) => {
  const shortUrls = await ShortUrl.find()
  res.render('index', { shortUrls: shortUrls })
})

app.post('/api/shorturl', async (req, res) => {
  const urlBody = req.body.url

  const httpRegex = /^(http|https)(:\/\/)/

  if (!httpRegex.test(urlBody)) {
    return res.json({ error: 'invalid url' })
  }

  await ShortUrl.create({ full: urlBody })

  const shortUrl = await ShortUrl.findOne({ full: urlBody })
  // Return response
  res.redirect('/')
})

app.get('/api/shorturl/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })

  if (shortUrl == null) return res.sendStatus(404)

  shortUrl.clicks++
  shortUrl.save()

  res.redirect(shortUrl.full)
})

app.listen(port, () => console.log(`Server running on localhost:${port}`))
