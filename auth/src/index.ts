import express from 'express'

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/api/users/currentuser', (req, res) => {
  res.send('Hi There!')
})

app.listen(3000, () => {
  console.log('Auth Service running on port:3000')
})
