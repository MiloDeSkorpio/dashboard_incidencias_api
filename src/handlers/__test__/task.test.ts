import request from "supertest"
import server from "../../server"

describe('POST /api/task', () => {
  it('should display validation errors', async () => {
    const response = await request(server).post('/api/task').send({})
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(6)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(3)
  })
  it('should display that the idBus is empty', async () => {
    const response = await request(server).post('/api/task').send({
      idBus: '',
      idFalla: 7,
      detalles: 'La falla tiene que tener más de 15 caracteres.'
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
      detalles: 'La falla tiene que tener más de 15 caracteres.'
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
      detalles: 'La falla tiene que tener más de 15 caracteres.'
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
      detalles: 'La falla tiene que tener más de 15 caracteres.'
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
      detalles: ''
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(2)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(3)
  })
  it('should display that the detalles is length greater 15', async () => {
    const response = await request(server).post('/api/task').send({
      idBus: 1,
      idFalla: 3,
      detalles: 'la falla'
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(3)
  })
})
