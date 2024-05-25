import request from "supertest"
import server from "../../server"

describe('POST /api/incidencia', () => {
  it('should display validation errors', async () => {
    const response = await request(server).post('/api/incidencia').send({})
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(8)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(3)
  })
  it('should display that the idBus is empty', async () => {
    const response = await request(server).post('/api/incidencia').send({
      idBus: '',
      idFalla: 7,
      detalles: 'La falla tiene que tener más de 15 caracteres.',
      idSuper: 1
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(2)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(3)
  })
  it('should display that the idBus is numeric', async () => {
    const response = await request(server).post('/api/incidencia').send({
      idBus: 'he',
      idFalla: 7,
      detalles: 'La falla tiene que tener más de 15 caracteres.',
      idSuper: 1
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(3)
  })
  it('should display that the idFalla is empty', async () => {
    const response = await request(server).post('/api/incidencia').send({
      idBus: 1,
      idFalla: '',
      detalles: 'La falla tiene que tener más de 15 caracteres.',
      idSuper: 1
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(2)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(3)
  })
  it('should display that the idFalla is numeric', async () => {
    const response = await request(server).post('/api/incidencia').send({
      idBus: 1,
      idFalla: 'les',
      detalles: 'La falla tiene que tener más de 15 caracteres.',
      idSuper: 1
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(3)
  })
  it('should display that the detalles is empty', async () => {
    const response = await request(server).post('/api/incidencia').send({
      idBus: 1,
      idFalla: 3,
      detalles: '',
      idSuper: 1
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(2)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(3)
  })
  it('should display that the detalles is length greater than 15', async () => {
    const response = await request(server).post('/api/incidencia').send({
      idBus: 1,
      idFalla: 3,
      detalles: 'la falla',
      idSuper: 1
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(3)
  })
  it('should create a new incidencia', async () => {
    const response = await request(server).post('/api/incidencia').send({
      idBus: 1,
      idFalla: 3,
      detalles: 'La falla tiene que tener más de 15 caracteres.',
      idSuper: 1
    })
    expect(response.status).toEqual(201)
    expect(response.body).toHaveProperty('data')

    expect(response.status).not.toBe(404)
    expect(response.status).not.toBe(200)
    expect(response.body).not.toHaveProperty('errors')
  })
})

describe('GET /api/incidencia', () => {
  it('should check if api/incidencia url exists', async () => {
    const response = await request(server).get('/api/incidencia')
    expect(response.status).not.toBe(404)
  })
  it('GET a JSON response with incidencia', async () => {
    const response = await request(server).get('/api/incidencia')
    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch(/json/)
    expect(response.body).toHaveProperty('data')
    expect(response.body.data).toHaveLength(1)
    expect(response.body).not.toHaveProperty('errors')
  })
})

describe('GET /api/incidencia/:id', () => {
  it('Should return a 404 response for a non-existent incidencia', async () => {
    const incidenciaId = 2000
    const response = await request(server).get(`/api/incidencia/${incidenciaId}`)
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('Incidencia No Encontrada')
  })

  it('should check a valid ID in the URL', async () => {
    const response = await request(server).get('/api/incidencia/not-valid-url')
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)
    expect(response.body.errors[0].msg).toBe('ID no Válido')
  })

  it('get a JSON response for a single incidencia', async () => {
    const response = await request(server).get('/api/incidencia/1')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')
  })
})

describe('PATCH /api/incidencia/:id', () => {
  it('should return a 404 response for a non-existing incidencia', async () => {
      const incidenciaId = 2000
      const response = await request(server).patch(`/api/incidencia/${incidenciaId}`)
      expect(response.status).toBe(404)
      expect(response.body.error).toBe('Incidencia no Encontrada')
      expect(response.status).not.toBe(200)
      expect(response.body).not.toHaveProperty('data')
  })
  it('should update the incidencia idTecnico', async () => {
      const response = await request(server).patch('/api/incidencia/1').send({
        idTec: 1
      })

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('data')
      expect(response.body.data.idTec).toBe(1)

      expect(response.status).not.toBe(404)
      expect(response.status).not.toBe(400)
      expect(response.body).not.toHaveProperty('error')
  })
})
describe('PATCH /api/incidencia/close/:id', () => {
  it('should return a 404 response for a non-existing incidencia', async () => {
      const incidenciaId = 2000
      const response = await request(server).patch(`/api/incidencia/close/${incidenciaId}`).send({
        observaciones: 'Es necesario agregar observaciones'
      })
      expect(response.status).toBe(404)
      expect(response.body.error).toBe('Incidencia no Encontrada')
      expect(response.status).not.toBe(200)
      expect(response.body).not.toHaveProperty('data')
  })
  it('should update the incidencia observaciones is not empty', async () => {
      const response = await request(server).patch('/api/incidencia/close/1').send({
        observaciones: ''
      })
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('errors')
      expect(response.body.errors).toHaveLength(2)
  
      expect(response.status).not.toBe(404)
      expect(response.body.errors).not.toHaveLength(3)
  })
  it('should update the incidencia observaciones is greather length than 15', async () => {
      const response = await request(server).patch('/api/incidencia/close/1').send({
        observaciones: 'Las obser'
      })
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('errors')
      expect(response.body.errors).toHaveLength(1)
  
      expect(response.status).not.toBe(404)
      expect(response.body.errors).not.toHaveLength(3)
  })
  it('should patch close to incidencia', async () => {
    const response = await request(server).patch('/api/incidencia/close/1').send({
      observaciones: 'El validador no contaba con un SAM valido.'
    })
    expect(response.status).toEqual(200)
    expect(response.body).toHaveProperty('data')

    expect(response.status).not.toBe(404)
    expect(response.status).not.toBe(400)
    expect(response.body).not.toHaveProperty('errors')
  })
})
describe('PATCH /api/incidencia/validated/:id', () => {
  it('should return a 404 response for a non-existing incidencia', async () => {
      const incidenciaId = 2000
      const response = await request(server).patch(`/api/incidencia/validated/${incidenciaId}`)
      expect(response.status).toBe(404)
      expect(response.body.error).toBe('Incidencia no Encontrada')
      expect(response.status).not.toBe(200)
      expect(response.body).not.toHaveProperty('data')
  })
  it('should update the incidencia idTecnico', async () => {
      const response = await request(server).patch('/api/incidencia/validated/1')

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('data')
      // expect(response.body.data.idTec).toBe(1)

      expect(response.status).not.toBe(404)
      expect(response.status).not.toBe(400)
      expect(response.body).not.toHaveProperty('error')
  })
})
