const express = require('express')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const cookieParser = require('cookie-parser')
const compression = require('compression')
const cors = require('cors')

const AppError = require('./utils/appError')
const postRouter = require('./routes/postRoutes')
const userRouter = require('./routes/userRoutes')
const commentRoutes = require('./routes/commentRoutes')
const replyRouter = require('./routes/replyRoutes')
const activityRouter = require('./routes/activityRouter')
const globalErrorHandler = require('./middlewares/errorHandler')

const app = express()

app.use(express.json())
app.use(helmet())

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  message: 'Too many request sent from this IP, please try again after an hour',
})

app.use('/api', limiter)

app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true, limit: '1mb' }))
app.use(cookieParser())
app.use(mongoSanitize())
app.use(xss())
app.use(compression())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  )
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  next()
})

// app.use(cors({ origin: 'http://127.0.0.1:3000/', credentials: true }))
// app.options('*', cors())

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'hello from the stitchr',
  })
})

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  console.log(req.cookies)
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
