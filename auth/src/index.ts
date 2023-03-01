import express from 'express'
import 'express-async-errors'
import mongoose from 'mongoose'
import cookieSession from 'cookie-session'
import { currentuserRouter } from './routes/current-user'
import { siginRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'
import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/not-found-error'

const app = express()
app.set('trust proxy', true)

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(
  cookieSession({
    signed: false,
    secure: true
  })
)

app.use(currentuserRouter)
app.use(siginRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.all('*', async (req, res) => {
  throw new NotFoundError()
})

app.use(errorHandler)

process.on('uncaughtException', (err) => console.log('Error:', err.message))

const start = async () => {
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
    console.log('Connected to mongodb')
  } catch (error) {
    console.error(error)
  }

  app.listen(3000, () => {
    console.log('Auth Service running on port:3000')
  })
}

start()
