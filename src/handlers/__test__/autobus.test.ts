import request from "supertest"
import server from "../../server"

describe('POST /api/autobus', () => {
  it('should display validation errors', async () => {
    const response = await request(server).post('/api/autobus').send({})
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(5)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(3)
  })
  it('should display that the economico is greater than 0', async () => {
    const response = await request(server).post('/api/autobus').send({
      economico: -3,
      corredorId: 2
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(2)
  })
  it('should display that the economico is empty', async () => {
    const response = await request(server).post('/api/autobus').send({
      economico: '',
      corredorId: 2
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(2)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(3)
  })
  it('should display that the corredorId is Numeric', async () => {
    const response = await request(server).post('/api/autobus').send({
      economico: 30,
      corredorId: 'B'
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(2)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(3)
  })
  it('should display that the corredorId is empty', async () => {
    const response = await request(server).post('/api/autobus').send({
      economico: 30,
      corredorId: ''
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(3)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(2)
  })
  it('should display that the corredorId is greater than 0', async () => {
    const response = await request(server).post('/api/autobus').send({
      economico: 30,
      corredorId: -10
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(3)
  })
  it('should create a new autobus', async () => {
    const response = await request(server).post('/api/autobus').send({
      economico: 30,
      corredorId: 1
    })
    expect(response.status).toEqual(201)
    expect(response.body).toHaveProperty('data')

    expect(response.status).not.toBe(404)
    expect(response.status).not.toBe(200)
    expect(response.body).not.toHaveProperty('errors')
  })
})
describe('GET /api/autobus', () => {
  it('should check if api/task url exists', async () => {
    const response = await request(server).get('/api/autobus')
    expect(response.status).not.toBe(404)
  })
  it('GET a JSON response with task', async () => {
    const response = await request(server).get('/api/autobus')
    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch(/json/)
    expect(response.body).toHaveProperty('data')
    expect(response.body.data).toHaveLength(1)
    expect(response.body).not.toHaveProperty('errors')
  })
})
describe('GET /api/autobus/:id', () => {
  it('Should return a 404 response for a non-existent autobus', async () => {
    const busId = 2000
    const response = await request(server).get(`/api/autobus/${busId}`)
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('Autobus No Encontrado')
  })
  it('should check a valid ID in the URL', async () => {
    const response = await request(server).get('/api/autobus/not-valid-url')
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)
    expect(response.body.errors[0].msg).toBe('ID no Válido')
  })
  it('get a JSON response for a single autobus', async () => {
    const response = await request(server).get('/api/autobus/1')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')
  })
})