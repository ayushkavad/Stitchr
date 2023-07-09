require('dotenv').config()
const { DBConnection } = require('./database/mongo.database')
const { DB } = require('./config/db.config')

process.on('uncaugthException', (err) => {
  console.log(err.name, err.message)
  console.log('UNCAUGTH EXCEPTION Shutting down...')
  process.exit(1)
})

const app = require('./app')

DBConnection(DB)
  .then(() => {
    console.log(`DB connect successfully...`)
  })
  .catch((error) => {
    console.log(`Something want wrong please try again later... ${error}`)
  })

const port = process.env.PORT || 3000

const server = app.listen(port, () => {
  console.log(`Server running at http://${process.env.HOST}:${port}/`)
})

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message)
  console.log('UNCAUGTH REJECTION Shutting down...')
  server.close(() => {
    process.exit(1)
  })
})
