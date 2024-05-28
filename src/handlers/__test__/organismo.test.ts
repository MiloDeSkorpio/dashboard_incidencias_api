import request from "supertest"
import server from "../../server"

describe('POST /api/organismo', () => {
  it('should display validation errors', async () => {
    const response = await request(server).post('/api/organismo').send({})
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(3)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(2)
  })
  it('should display that the nombre is not numeric', async () => {
    const response = await request(server).post('/api/organismo').send({
      nombre: 3,
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(2)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(3)
  })
  it('should display that the nombre is empty', async () => {
    const response = await request(server).post('/api/organismo').send({
      nombre: '',
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(2)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(3)
  })
  it('should display that the nombre is greather length than 2', async () => {
    const response = await request(server).post('/api/organismo').send({
      nombre: 'Pe',
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(2)
  })
  it('should create a new organismo', async () => {
    const response = await request(server).post('/api/organismo').send({
      nombre: 'ORT',
    })
    expect(response.status).toEqual(201)
    expect(response.body).toHaveProperty('data')

    expect(response.status).not.toBe(404)
    expect(response.status).not.toBe(200)
    expect(response.body).not.toHaveProperty('errors')
  })
})
describe('GET /api/organismo', () => {
  it('should check if api/task url exists', async () => {
    const response = await request(server).get('/api/organismo')
    expect(response.status).not.toBe(404)
  })
  it('GET a JSON response with task', async () => {
    const response = await request(server).get('/api/organismo')
    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch(/json/)
    expect(response.body).toHaveProperty('data')
    expect(response.body.data).toHaveLength(1)
    expect(response.body).not.toHaveProperty('errors')
  })
})
describe('GET /api/organismo/:id', () => {
  it('Should return a 404 response for a non-existent organismo', async () => {
    const busId = 2000
    const response = await request(server).get(`/api/organismo/${busId}`)
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('Organismo No Encontrado')
  })
  it('should check a valid ID in the URL', async () => {
    const response = await request(server).get('/api/organismo/not-valid-url')
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)
    expect(response.body.errors[0].msg).toBe('ID no Válido')
  })
  it('get a JSON response for a single organismo', async () => {
    const response = await request(server).get('/api/organismo/1')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')
  })
})
describe('PUT /api/organismo/:id', () => {
  it('should check a valid ID in the URL', async () => {
    const response = await request(server)
      .put('/api/organismo/not-valid-url')
      .send({
        nombre: 'ORT',
      })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)
    expect(response.body.errors[0].msg).toBe('ID no Válido')
  })
  it('should display validation error messages when updating a organismo', async () => {
    const response = await request(server).put('/api/organismo/1').send({})

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toBeTruthy()
    expect(response.body.errors).toHaveLength(1)

    expect(response.status).not.toBe(200)
    expect(response.body).not.toHaveProperty('data')
  })
  it('should validate that the nombre is not empty', async () => {
    const response = await request(server)
      .put('/api/organismo/1')
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
    const organismoId = 2000
    const response = await request(server)
      .put(`/api/organismo/${organismoId}`)
      .send({
        nombre: 'ORT',
      })

    expect(response.status).toBe(404)
    expect(response.body.error).toBe('Organismo No Encontrado')

    expect(response.status).not.toBe(200)
    expect(response.body).not.toHaveProperty('data')
  })
  it('should update an existing organismo with valid data', async () => {
    const response = await request(server)
      .put(`/api/organismo/1`)
      .send({
        nombre: 'ORT ACT',
      })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')

    expect(response.status).not.toBe(400)
    expect(response.body).not.toHaveProperty('errors')
  })
})
describe('DELETE /api/organismo/:id', () => {
  it('should check a valid ID', async () => {
    const response = await request(server).delete('/api/organismo/not-valid')
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors[0].msg).toBe('ID no Válido')
  })
  it('should return a 404 response for a non-existent organismo', async () => {
    const organismoId = 2000
    const response = await request(server).delete(`/api/organismo/${organismoId}`)
    expect(response.status).toBe(404)
    expect(response.body.error).toBe('Organismo No Encontrado')
    expect(response.status).not.toBe(200)
  })
  it('should delete a organismo', async () => {
    const response = await request(server).delete('/api/organismo/1')
    expect(response.status).toBe(200)
    expect(response.body.data).toBe("Organismo Eliminado")

    expect(response.status).not.toBe(404)
    expect(response.status).not.toBe(400)
  })
})