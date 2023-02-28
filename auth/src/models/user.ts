import mongoose, { Schema, model } from 'mongoose'
import { Password } from '../services/password'

// Properties required to create a new user
interface UserAttrs {
  email: string
  password: string
}

// An interface to describe the properties that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc
}

// An interface to describe the properties that a User Document has
interface UserDoc extends mongoose.Document {
  email: string
  password: string
}

const userSchema = new Schema<UserAttrs>({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'))
    this.set('password', hashed)
  }

  done()
})

// Adding new method to the statics object
userSchema.statics.build = (attrs: UserAttrs) => new User(attrs)

const User = model<UserDoc, UserModel>('User', userSchema)

export { User }
