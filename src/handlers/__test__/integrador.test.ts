import request from "supertest"
import server from "../../server"

describe('POST /api/integrador', () => {
  it('should display validation errors', async () => {
    const response = await request(server).post('/api/integrador').send({})
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(3)
  })
  it('should display that the nombre is empty', async () => {
    const response = await request(server).post('/api/integrador').send({
      nombre: ''
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(2)
  })
  it('should create a new task', async () => {
    const response = await request(server).post('/api/integrador').send({
      nombre: 'JM',
    })
    expect(response.status).toEqual(201)
    expect(response.body).toHaveProperty('data')

    expect(response.status).not.toBe(404)
    expect(response.status).not.toBe(200)
    expect(response.body).not.toHaveProperty('errors')
  })
})
describe('GET /api/integrador', () => {
  it('should check if api/task url exists', async () => {
    const response = await request(server).get('/api/integrador')
    expect(response.status).not.toBe(404)
  })
  it('GET a JSON response with task', async () => {
    const response = await request(server).get('/api/integrador')
    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch(/json/)
    expect(response.body).toHaveProperty('data')
    expect(response.body.data).toHaveLength(1)
    expect(response.body).not.toHaveProperty('errors')
  })
})
describe('GET /api/integrador/:id', () => {
  it('Should return a 404 response for a non-existent integrador', async () => {
    const integId = 2000
    const response = await request(server).get(`/api/integrador/${integId}`)
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('Integrador No Encontrado')
  })
  it('should check a valid ID in the URL', async () => {
    const response = await request(server).get('/api/integrador/not-valid-url')
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)
    expect(response.body.errors[0].msg).toBe('ID no Válido')
  })
  it('get a JSON response for a single integrador', async () => {
    const response = await request(server).get('/api/integrador/1')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')
  })
})