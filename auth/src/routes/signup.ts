import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/user'
import { body, validationResult } from 'express-validator'
import { RequestValidationError } from '../errors/request-validation-error'
import { BadRequestError } from '../errors/bad-request-error'

const router = express.Router()

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters')
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array())
    }

    const { email, password } = req.body

    const existingUser = await User.findOne({ email }).exec()
    if (existingUser) throw new BadRequestError('Email is already in used')

    // Create new user
    const newUser = User.build({ email, password })
    await newUser.save()

    //Generate JWT
    const userJwt = jwt.sign({ _id: newUser._id, email: newUser.email }, 'asdf')

    // Send jwt/cookie or something
    req.session = {
      jwt: userJwt
    }

    res.status(201).json({
      user: newUser
    })
  }
)

export { router as signupRouter }
