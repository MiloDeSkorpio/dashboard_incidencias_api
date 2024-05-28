import request from "supertest"
import server from "../../server"

describe('POST /api/falla', () => {
  it('should display validation errors', async () => {
    const response = await request(server).post('/api/falla').send({})
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(2)
  })
  it('should display that the nombre is empty', async () => {
    const response = await request(server).post('/api/falla').send({
      nombre: '',
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(2)
  })
  it('should create a new falla', async () => {
    const response = await request(server).post('/api/falla').send({
      nombre: 'Falla en validador',
    })
    expect(response.status).toEqual(201)
    expect(response.body).toHaveProperty('data')

    expect(response.status).not.toBe(404)
    expect(response.status).not.toBe(200)
    expect(response.body).not.toHaveProperty('errors')
  })
})
describe('GET /api/falla', () => {
  it('should check if api/task url exists', async () => {
    const response = await request(server).get('/api/falla')
    expect(response.status).not.toBe(404)
  })
  it('GET a JSON response with task', async () => {
    const response = await request(server).get('/api/falla')
    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch(/json/)
    expect(response.body).toHaveProperty('data')
    expect(response.body.data).toHaveLength(1)
    expect(response.body).not.toHaveProperty('errors')
  })
})
describe('GET /api/falla/:id', () => {
  it('Should return a 404 response for a non-existent falla', async () => {
    const integId = 2000
    const response = await request(server).get(`/api/falla/${integId}`)
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('Falla No Encontrada')
  })
  it('should check a valid ID in the URL', async () => {
    const response = await request(server).get('/api/falla/not-valid-url')
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)
    expect(response.body.errors[0].msg).toBe('ID no Válido')
  })
  it('get a JSON response for a single falla', async () => {
    const response = await request(server).get('/api/falla/1')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')
  })
})
describe('PUT /api/falla/:id', () => {
  it('should check a valid ID in the URL', async () => {
    const response = await request(server)
      .put('/api/falla/not-valid-url')
      .send({
        nombre: 'Falla en validador',
      })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)
    expect(response.body.errors[0].msg).toBe('ID no Válido')
  })
  it('should display validation error messages when updating a falla', async () => {
    const response = await request(server).put('/api/falla/1').send({})

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toBeTruthy()
    expect(response.body.errors).toHaveLength(1)

    expect(response.status).not.toBe(200)
    expect(response.body).not.toHaveProperty('data')
  })
  it('should validate that the nombre is not empty', async () => {
    const response = await request(server)
      .put('/api/falla/1')
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
    const fallaId = 2000
    const response = await request(server)
      .put(`/api/falla/${fallaId}`)
      .send({
        nombre: 'Apagado, No enciende',
      })

    expect(response.status).toBe(404)
    expect(response.body.error).toBe('Falla No Encontrada')

    expect(response.status).not.toBe(200)
    expect(response.body).not.toHaveProperty('data')
  })
  it('should update an existing falla with valid data', async () => {
    const response = await request(server)
      .put(`/api/falla/1`)
      .send({
        nombre: 'Apagado, No enciende',
      })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')

    expect(response.status).not.toBe(400)
    expect(response.body).not.toHaveProperty('errors')
  })
})
describe('DELETE /api/falla/:id', () => {
  it('should check a valid ID', async () => {
    const response = await request(server).delete('/api/falla/not-valid')
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors[0].msg).toBe('ID no Válido')
  })
  it('should return a 404 response for a non-existent falla', async () => {
    const fallaId = 2000
    const response = await request(server).delete(`/api/falla/${fallaId}`)
    expect(response.status).toBe(404)
    expect(response.body.error).toBe('Falla No Encontrada')
    expect(response.status).not.toBe(200)
  })
  it('should delete a falla', async () => {
    const response = await request(server).delete('/api/falla/1')
    expect(response.status).toBe(200)
    expect(response.body.data).toBe("Falla Eliminada")

    expect(response.status).not.toBe(404)
    expect(response.status).not.toBe(400)
  })
})
