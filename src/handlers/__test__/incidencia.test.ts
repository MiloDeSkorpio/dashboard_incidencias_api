import request from "supertest"
import server from "../../server"

describe('POST /api/task', () => {
  it('should display validation errors', async () => {
    const response = await request(server).post('/api/task').send({})
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(8)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(3)
  })
  it('should display that the idBus is empty', async () => {
    const response = await request(server).post('/api/task').send({
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
    const response = await request(server).post('/api/task').send({
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
    const response = await request(server).post('/api/task').send({
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
    const response = await request(server).post('/api/task').send({
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
    const response = await request(server).post('/api/task').send({
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
    const response = await request(server).post('/api/task').send({
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
  it('should create a new task', async () => {
    const response = await request(server).post('/api/task').send({
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

describe('GET /api/task', () => {
  it('should check if api/task url exists', async () => {
    const response = await request(server).get('/api/task')
    expect(response.status).not.toBe(404)
  })
  it('GET a JSON response with task', async () => {
    const response = await request(server).get('/api/task')
    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch(/json/)
    expect(response.body).toHaveProperty('data')
    expect(response.body.data).toHaveLength(1)
    expect(response.body).not.toHaveProperty('errors')
  })
})

describe('GET /api/task/:id', () => {
  it('Should return a 404 response for a non-existent task', async () => {
    const taskId = 2000
    const response = await request(server).get(`/api/task/${taskId}`)
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('Incidencia No Encontrada')
  })

  it('should check a valid ID in the URL', async () => {
    const response = await request(server).get('/api/task/not-valid-url')
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)
    expect(response.body.errors[0].msg).toBe('ID no Válido')
  })

  it('get a JSON response for a single task', async () => {
    const response = await request(server).get('/api/task/1')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')
  })
})

describe('PATCH /api/task/:id', () => {
  it('should return a 404 response for a non-existing task', async () => {
      const taskId = 2000
      const response = await request(server).patch(`/api/task/${taskId}`)
      expect(response.status).toBe(404)
      expect(response.body.error).toBe('Incidencia no Encontrada')
      expect(response.status).not.toBe(200)
      expect(response.body).not.toHaveProperty('data')
  })
  it('should update the task idTecnico', async () => {
      const response = await request(server).patch('/api/task/1').send({
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
describe('PATCH /api/task/close/:id', () => {
  it('should return a 404 response for a non-existing task', async () => {
      const taskId = 2000
      const response = await request(server).patch(`/api/task/close/${taskId}`).send({
        observaciones: 'Es necesario agregar observaciones'
      })
      expect(response.status).toBe(404)
      expect(response.body.error).toBe('Incidencia no Encontrada')
      expect(response.status).not.toBe(200)
      expect(response.body).not.toHaveProperty('data')
  })
  it('should update the task observaciones is not empty', async () => {
      const response = await request(server).patch('/api/task/close/1').send({
        observaciones: ''
      })
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('errors')
      expect(response.body.errors).toHaveLength(2)
  
      expect(response.status).not.toBe(404)
      expect(response.body.errors).not.toHaveLength(3)
  })
  it('should update the task observaciones is greather length than 15', async () => {
      const response = await request(server).patch('/api/task/close/1').send({
        observaciones: 'Las obser'
      })
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('errors')
      expect(response.body.errors).toHaveLength(1)
  
      expect(response.status).not.toBe(404)
      expect(response.body.errors).not.toHaveLength(3)
  })
  it('should patch close to task', async () => {
    const response = await request(server).patch('/api/task/close/1').send({
      observaciones: 'El validador no contaba con un SAM valido.'
    })
    expect(response.status).toEqual(200)
    expect(response.body).toHaveProperty('data')

    expect(response.status).not.toBe(404)
    expect(response.status).not.toBe(400)
    expect(response.body).not.toHaveProperty('errors')
  })
})
describe('PATCH /api/task/validated/:id', () => {
  it('should return a 404 response for a non-existing task', async () => {
      const taskId = 2000
      const response = await request(server).patch(`/api/task/validated/${taskId}`)
      expect(response.status).toBe(404)
      expect(response.body.error).toBe('Incidencia no Encontrada')
      expect(response.status).not.toBe(200)
      expect(response.body).not.toHaveProperty('data')
  })
  it('should update the task idTecnico', async () => {
      const response = await request(server).patch('/api/task/validated/1')

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('data')
      // expect(response.body.data.idTec).toBe(1)

      expect(response.status).not.toBe(404)
      expect(response.status).not.toBe(400)
      expect(response.body).not.toHaveProperty('error')
  })
})
