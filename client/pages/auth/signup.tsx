import React from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'

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
      console.log(payload)
    }
  })
  return <form>Form</form>
}

export default SignUp
