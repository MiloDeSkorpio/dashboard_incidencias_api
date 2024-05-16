import request from "supertest"
import server from "../../server"

describe('POST /api/status', () => {
  it('should display validation errors', async () => {
    const response = await request(server).post('/api/status').send({})
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(3)
  })
  it('should display that the nombre is empty', async () => {
    const response = await request(server).post('/api/status').send({
      nombre: ''
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).not.toHaveLength(3)
  })
})
