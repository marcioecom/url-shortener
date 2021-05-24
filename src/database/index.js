import mongoose from 'mongoose'

mongoose.connect(process.env.DB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => console.log('Connection to database established')
).catch((err) => {
  console.log(`db err ${err}`)
  process.exit(-1)
})

mongoose.Promise = global.Promise;

export default mongoose