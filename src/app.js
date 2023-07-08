const express = require('express')
const morgan = require('morgan')
const postRouter = require('./routers/post.routes')

const app = express()

app.use(express.json())

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'hello from the stitchr',
  })
})

app.use('/api/v1/posts/', postRouter)

module.exports = app
