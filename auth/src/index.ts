import { app } from './app'
import mongoose from 'mongoose'

process.on('uncaughtException', (err) => console.log('Error:', err.message))

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined')
  }

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
