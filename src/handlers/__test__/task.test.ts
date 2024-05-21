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

// describe('PATCH /api/task/:id', () => {
//   it('should return a 404 response for a non-existing task', async () => {
//       const taskId = 2000
//       const response = await request(server).patch(`/api/task/${taskId}`)
//       expect(response.status).toBe(404)
//       expect(response.body.error).toBe('Incidencia no Encontrada')
//       expect(response.status).not.toBe(200)
//       expect(response.body).not.toHaveProperty('data')
//   })

//   it('should update the task idTecnico', async () => {
//       const response = await request(server).patch('/api/task/1')
//       expect(response.status).toBe(200)
//       expect(response.body).toHaveProperty('data')
//       expect(response.body.data.idTec).toBe(1)

//       expect(response.status).not.toBe(404)
//       expect(response.status).not.toBe(400)
//       expect(response.body).not.toHaveProperty('error')
//   })
// })

describe('PUT /api/task/:id', () => {
  it('should check a valid ID in the URL', async () => {
    const response = await request(server)
      .put('/api/task/not-valid-url')
      .send({
        idStatus: 1,
        id: 1,
        idBus: 2,
        idFalla: 8,
        detalles: 'El Validor tarda en leer las tarjetas',
        updatedAt: '2024-05-21T00:22:02.448Z',
        createdAt: '2024-05-21T00:22:02.448Z',
        idSuper: 1,
        idTec: 1,
        assignedAt: '2024-05-21T00:22:02.448Z',
        observaciones: 'Se realizaron tods las reparaciones correspondientes',
        validatedAt: '2024-05-21T00:22:02.448Z',
        timeAtention: null
      })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)
    expect(response.body.errors[0].msg).toBe('ID no Válido')
  })
})
