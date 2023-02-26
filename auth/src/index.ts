import express from 'express'
import { currentuserRouter } from './routes/current-user'
import { siginRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'
import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/not-found-error'

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(currentuserRouter)
app.use(siginRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.all('*', () => {
  throw new NotFoundError()
})

app.use(errorHandler)

process.on('uncaughtException', (err) => console.log('Error:', err.message))

app.listen(3000, () => {
  console.log('Auth Service running on port:3000')
})
