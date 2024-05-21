import request from "supertest"
import server from "../../server"

describe('GET /api/status', () => {
  it('should check if api/status url exists', async () => {
    const response = await request(server).get('/api/status')
    expect(response.status).not.toBe(404)
  })
  it('GET a JSON response with status', async () => {
    const response = await request(server).get('/api/status')
    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch(/json/)
    expect(response.body).toHaveProperty('data')
    expect(response.body.data).toHaveLength(1)
    expect(response.body).not.toHaveProperty('errors')
  })
})

describe('GET /api/status/:id', () => {
  it('Should return a 404 response for a non-existent status', async () => {
    const statusId = 2000
    const response = await request(server).get(`/api/status/${statusId}`)
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('Status No Encontrado')
  })

  it('should check a valid ID in the URL', async () => {
    const response = await request(server).get('/api/status/not-valid-url')
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)
    expect(response.body.errors[0].msg).toBe('ID no Válido')
  })

  it('get a JSON response for a single status', async () => {
    const response = await request(server).get('/api/status/1')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')
  })
})