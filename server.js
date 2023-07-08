const mongoose = require('mongoose')
require('dotenv').config()

const app = require('./app')

const DB = process.env.DATABASE_URL.replace(
  '<PASSWORD>',
  process.env.DATABASE_ROOT_PASSWORD
)

const DBConnection = (DB) => {
  return new Promise((resolve, reject) => {
    mongoose.set('strictQuery', false)
    mongoose
      .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        resolve()
      })
      .catch((error) => {
        reject(error)
      })
  })
}

DBConnection(DB)
  .then(() => {
    console.log(`DB connect successfully...`)
  })
  .catch((error) => {
    console.log(`Something want wrong please try again later... ${error}`)
  })

const port = process.env.PORT || 3000

console.log(process.env.HOST, process.env.PORT)

app.listen(port, () => {
  console.log(`Server running at http://${process.env.HOST}:${port}/`)
})
