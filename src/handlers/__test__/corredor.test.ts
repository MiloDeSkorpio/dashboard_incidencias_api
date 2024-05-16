import request from "supertest"
import server from "../../server"

describe('POST /api/corredor', () => {
  it('should display validation errors', async () => {
    const response = await request(server).post('/api/corredor').send({})
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(3)

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
    expect(response.body.errors).toHaveLength(2)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(3)
  })
  it('should display that the integradorId is greater than 0', async () => {
    const response = await request(server).post('/api/corredor').send({
      nombre: 'SAUSA',
      integradorId: -1
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(3)
  })
})