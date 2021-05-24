import express from 'express'
require('dotenv').config()

const port = process.env.PORT
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.send({ ok: true })
})

app.listen(port, () => console.log(`Server running on localhost:${port}`))