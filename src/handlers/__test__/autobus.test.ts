import request from "supertest"
import server from "../../server"

describe('POST /api/autobus', () => {
  it('should display validation errors', async () => {
    const response = await request(server).post('/api/autobus').send({})
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(4)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(3)
  })
  it('should display that the economico is greater than 0', async () => {
    const response = await request(server).post('/api/autobus').send({
      economico: -3,
      corredorId: 2
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(2)
  })
  it('should display that the economico is empty', async () => {
    const response = await request(server).post('/api/autobus').send({
      economico: '',
      corredorId: 2
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(2)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(3)
  })
  it('should display that the corredorId is empty', async () => {
    const response = await request(server).post('/api/autobus').send({
      economico: 30,
      corredorId: ''
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(2)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(3)
  })
  it('should display that the corredorId is greater than 0', async () => {
    const response = await request(server).post('/api/autobus').send({
      economico: 30,
      corredorId: -10
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(3)
  })
})




// import request from "supertest";
// import server from "../../server";

// describe('POST /api/products', () => {
//   it('should display validation errors', async () => {
//     const response = await request(server).post('/api/products').send({})
//     expect(response.status).toBe(400)
//     expect(response.body).toHaveProperty('errors')
//     expect(response.body.errors).toHaveLength(4)

//     expect(response.status).not.toBe(404)
//     expect(response.body.errors).not.toHaveLength(2)
//   })

//   it('should display that the price is greater than 0', async () => {
//     const response = await request(server).post('/api/products').send({
//       name: 'Monitor Curvo',
//       price: 0
//     })
//     expect(response.status).toBe(400)
//     expect(response.body).toHaveProperty('errors')
//     expect(response.body.errors).toHaveLength(1)

//     expect(response.status).not.toBe(404)
//     expect(response.body.errors).not.toHaveLength(2)
//   })

//   it('should display that the price is a number and greater than 0', async () => {
//     const response = await request(server).post('/api/products').send({
//       name: 'Monitor Curvo',
//       price: "hola"
//     })
//     expect(response.status).toBe(400)
//     expect(response.body).toHaveProperty('errors')
//     expect(response.body.errors).toHaveLength(2)

//     expect(response.status).not.toBe(404)
//     expect(response.body.errors).not.toHaveLength(4)
//   })

//   it('should create a new product', async () => {
//     const response = await request(server).post('/api/products').send({
//       name: "Monitor Nuevo - Testing",
//       price: 400,
//     })
//     expect(response.status).toBe(201)
//     expect(response.body).toHaveProperty('data')

//     expect(response.status).not.toBe(404)
//     expect(response.status).not.toBe(202)
//     expect(response.status).not.toHaveProperty('error')
//   })
// })