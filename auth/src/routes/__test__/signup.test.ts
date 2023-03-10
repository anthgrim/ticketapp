import request from 'supertest'
import { app } from '../../app'

const targetUrl = '/api/users/signup'

it('returns a 201 on successful signup', async () => {
  return request(app)
    .post(targetUrl)
    .send({
      email: 'email@email.com',
      password: 'password'
    })
    .expect(201)
})

it('returns a 400 with an invalid email', async () => {
  return request(app)
    .post(targetUrl)
    .send({
      email: 'something',
      password: 'password'
    })
    .expect(400)
})

it('returns a 400 with an invalid password', async () => {
  return request(app)
    .post(targetUrl)
    .send({
      email: 'email@email.com',
      password: '2'
    })
    .expect(400)
})

it('returns a 400 with missing email and/or password', async () => {
  await request(app)
    .post(targetUrl)
    .send({ email: 'email@mail.com' })
    .expect(400)
  await request(app).post(targetUrl).send({ password: 'password' }).expect(400)
  await request(app).post(targetUrl).send({}).expect(400)
})

it('returns a 400 when user is trying to signup with existing email', async () => {
  await request(app)
    .post(targetUrl)
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201)

  await request(app)
    .post(targetUrl)
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(400)
})

it('sets cookie after successful signup', async () => {
  const response = await request(app)
    .post(targetUrl)
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201)

  expect(response.get('Set-Cookie')).toBeDefined()
})
