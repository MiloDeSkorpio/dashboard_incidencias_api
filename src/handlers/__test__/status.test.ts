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
  it('should create a new status', async () => {
    const response = await request(server).post('/api/status').send({
      nombre: 'Abierta'
    })
    expect(response.status).toEqual(201)
    expect(response.body).toHaveProperty('data')

    expect(response.status).not.toBe(404)
    expect(response.status).not.toBe(200)
    expect(response.body).not.toHaveProperty('errors')
  })
})

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

describe('PUT /api/status/:id', () => {
  it('should check a valid ID in the URL', async () => {
    const response = await request(server)
      .put('/api/status/not-valid-url')
      .send({
        nombre: 'Abierta',
      })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)
    expect(response.body.errors[0].msg).toBe('ID no Válido')
  })
  it('should display validation error messages when updating a status', async () => {
    const response = await request(server).put('/api/status/1').send({})

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toBeTruthy()
    expect(response.body.errors).toHaveLength(1)

    expect(response.status).not.toBe(200)
    expect(response.body).not.toHaveProperty('data')
  })
  it('should validate that the nombre is not empty', async () => {
    const response = await request(server)
      .put('/api/status/1')
      .send({
        nombre: '',
      })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toBeTruthy()
    expect(response.body.errors).toHaveLength(1)
    expect(response.body.errors[0].msg).toBe('El Nombre no puede ir vacio')

    expect(response.status).not.toBe(200)
    expect(response.body).not.toHaveProperty('data')
  })
  it('should return a 404 response for a non-existent usuario', async () => {
    const statusId = 2000
    const response = await request(server)
      .put(`/api/status/${statusId}`)
      .send({
        nombre: 'Abierta ACT',
      })

    expect(response.status).toBe(404)
    expect(response.body.error).toBe('Status de Incidencia No Encontrado')

    expect(response.status).not.toBe(200)
    expect(response.body).not.toHaveProperty('data')
  })
  it('should update an existing status with valid data', async () => {
    const response = await request(server)
      .put(`/api/status/1`)
      .send({
        nombre: 'Abierta ACT',
      })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')

    expect(response.status).not.toBe(400)
    expect(response.body).not.toHaveProperty('errors')
  })
})

describe('DELETE /api/status/:id', () => {
  it('should check a valid ID', async () => {
    const response = await request(server).delete('/api/status/not-valid')
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors[0].msg).toBe('ID no Válido')
  })
  it('should return a 404 response for a non-existent status', async () => {
    const statusId = 2000
    const response = await request(server).delete(`/api/status/${statusId}`)
    expect(response.status).toBe(404)
    expect(response.body.error).toBe('Status de Incidencia No Encontrado')
    expect(response.status).not.toBe(200)
  })
  it('should delete a status', async () => {
    const response = await request(server).delete('/api/status/1')
    expect(response.status).toBe(200)
    expect(response.body.data).toBe("Status de Incidencia Eliminado")

    expect(response.status).not.toBe(404)
    expect(response.status).not.toBe(400)
  })
})