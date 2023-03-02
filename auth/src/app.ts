import express from 'express'
import 'express-async-errors'
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

export { app }
