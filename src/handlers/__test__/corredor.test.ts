import request from "supertest"
import server from "../../server"

describe('POST /api/corredor', () => {
  it('should display validation errors', async () => {
    const response = await request(server).post('/api/corredor').send({})
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(4)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(2)
  })
  it('should display that the nombre is empty', async () => {
    const response = await request(server).post('/api/corredor').send({
      nombre: '',
      integradorId: 1
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(3)
  })
  it('should display that the integradorId is empty', async () => {
    const response = await request(server).post('/api/corredor').send({
      nombre: 'SAUSA',
      integradorId: ''
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(3)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(4)
  })
  it('should display that the integradorId is Numeric', async () => {
    const response = await request(server).post('/api/corredor').send({
      nombre: 'SAUSA',
      integradorId: 'A'
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(2)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(3)
  })
  it('should create a new corredor', async () => {
    const response = await request(server).post('/api/corredor').send({
      nombre: 'SAUSA',
      integradorId: 1
    })
    expect(response.status).toEqual(201)
    expect(response.body).toHaveProperty('data')

    expect(response.status).not.toBe(404)
    expect(response.status).not.toBe(200)
    expect(response.body).not.toHaveProperty('errors')
  })
})
describe('GET /api/corredor', () => {
  it('should check if api/task url exists', async () => {
    const response = await request(server).get('/api/corredor')
    expect(response.status).not.toBe(404)
  })
  it('GET a JSON response with task', async () => {
    const response = await request(server).get('/api/corredor')
    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch(/json/)
    expect(response.body).toHaveProperty('data')
    expect(response.body.data).toHaveLength(1)
    expect(response.body).not.toHaveProperty('errors')
  })
})
describe('GET /api/corredor/:id', () => {
  it('Should return a 404 response for a non-existent corredor', async () => {
    const corrId = 2000
    const response = await request(server).get(`/api/corredor/${corrId}`)
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('Corredor No Encontrado')
  })
  it('should check a valid ID in the URL', async () => {
    const response = await request(server).get('/api/corredor/not-valid-url')
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)
    expect(response.body.errors[0].msg).toBe('ID no Válido')
  })
  it('get a JSON response for a single corredor', async () => {
    const response = await request(server).get('/api/corredor/1')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')
  })
})