import { app } from './app'
import mongoose from 'mongoose'

process.on('uncaughtException', (err) => console.log('Error:', err.message))

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined')
  }

  if (!process.env.TICKETS_DB) {
    throw new Error('TICKETS_DB must be defined')
  }

  try {
    await mongoose.connect(process.env.TICKETS_DB)
    console.log('Connected to mongodb tickets')
  } catch (error) {
    console.error(error)
  }

  app.listen(3000, () => {
    console.log('Tickets Service running on port:3000')
  })
}

start()
