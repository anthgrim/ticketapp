import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { app } from '../app'

jest.setTimeout(30000)

let mongo: any

// Hook function to run befor all tests start
beforeAll(async () => {
  process.env.JWT_KEY = 'testString'

  // Create instance of in-memory mongodb server
  mongo = await MongoMemoryServer.create()
  const mongoUri = mongo.getUri()

  await mongoose.connect(mongoUri, {})
})
// Hook function that runs befor each test
beforeEach(async () => {
  const collections = await mongoose.connection.db.collections()

  // Reset data
  for (let collection of collections) {
    await collection.deleteMany({})
  }
})

//After all tests ran
afterAll(async () => {
  if (mongo) await mongo.stop()
  await mongoose.connection.close()
})
