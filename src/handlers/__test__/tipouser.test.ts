import request from "supertest"
import server from "../../server"

describe('POST /api/tipouser', () => {
  it('should display validation errors', async () => {
    const response = await request(server).post('/api/tipouser').send({})
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(3)
  })
  it('should display that the nombre is empty', async () => {
    const response = await request(server).post('/api/tipouser').send({
      nombre: ''
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(2)
  })
  it('should create a new tipouser', async () => {
    const response = await request(server).post('/api/tipouser').send({
      nombre:'JUDCV'
    })
    expect(response.status).toEqual(201)
    expect(response.body).toHaveProperty('data')

    expect(response.status).not.toBe(404)
    expect(response.status).not.toBe(200)
    expect(response.body).not.toHaveProperty('errors')
  })
})

describe('GET /api/tipouser', () => {
  it('should check if api/tipouser url exists', async () => {
    const response = await request(server).get('/api/tipouser')
    expect(response.status).not.toBe(404)
  })
  it('GET a JSON response with tipouser', async () => {
    const response = await request(server).get('/api/tipouser')
    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch(/json/)
    expect(response.body).toHaveProperty('data')
    expect(response.body.data).toHaveLength(1)
    expect(response.body).not.toHaveProperty('errors')
  })
})

describe('GET /api/tipouser/:id', () => {
  it('Should return a 404 response for a non-existent tipouser', async () => {
    const tipouserId = 2000
    const response = await request(server).get(`/api/tipouser/${tipouserId}`)
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('Tipo de Usuario No Encontrado')
  })

  it('should check a valid ID in the URL', async () => {
    const response = await request(server).get('/api/tipouser/not-valid-url')
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)
    expect(response.body.errors[0].msg).toBe('ID no Válido')
  })

  it('get a JSON response for a single tipouser', async () => {
    const response = await request(server).get('/api/tipouser/1')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')
  })
})
