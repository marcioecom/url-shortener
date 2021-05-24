import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send({ ok: true })
})

app.listen(4000, () => console.log('Server running on localhost:4000'))