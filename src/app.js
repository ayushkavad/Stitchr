const express = require('express')
const morgan = require('morgan')
const postRouter = require('./routes/postRoutes')
const userRouter = require('./routes/userRoutes')
const commentRoutes = require('./routes/commentRoutes')
const replyRouter = require('./routes/replyRoutes')
const activityRouter = require('./routes/activityRouter')
const AppError = require('./utils/appError')
const globalErrorHandler = require('./middlewares/errorHandler')

const app = express()

app.use(express.json())

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'hello from the stitchr',
  })
})

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  console.log(req.requestTime)
  next()
})

app.use('/api/v1/posts', postRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/comments', commentRoutes)
app.use('/api/v1/replies', replyRouter)
app.use('/api/v1/activities', activityRouter)

app.all('*', (req, res, next) => {
  next(new AppError(`Can not found ${req.originalUrl} on this server!`, 404))
})

app.use(globalErrorHandler)

module.exports = app
