const mongoose = require('mongoose')

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

module.exports = {
  DBConnection,
}
