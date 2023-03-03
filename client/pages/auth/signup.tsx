import React from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { Input } from '@/components'
import axios from 'axios'

const SignUp = () => {
  const validationSchema = yup.object({
    email: yup.string().email('Enter a valid email').required('Required'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 chars long')
      .required('Required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Required')
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema,
    onSubmit: async () => {
      const { email, password } = formik.values
      const payload = { email, password }

      try {
        const response = await axios.post('/api/users/signup', payload)
        console.log(response.data)
      } catch (error) {
        console.error(error)
      }
    }
  })
  return (
    <div className='container'>
      <h1>Sign Up</h1>
      <Input
        inputId='email'
        inputName='email'
        labelText='Email Address'
        value={formik.values.email}
        onChange={formik.handleChange}
        errorMessage={formik.errors.email}
        type='email'
      />
      <Input
        inputId='password'
        inputName='password'
        labelText='Password'
        value={formik.values.password}
        onChange={formik.handleChange}
        type='password'
        errorMessage={formik.errors.password}
      />
      <Input
        inputId='confirmPassword'
        inputName='confirmPassword'
        labelText='Confirm Password'
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        type='password'
        errorMessage={formik.errors.confirmPassword}
      />
      <button
        type='submit'
        className='btn btn-primary m-2'
        onClick={() => formik.handleSubmit()}
      >
        Sign Up
      </button>
    </div>
  )
}

export default SignUp
