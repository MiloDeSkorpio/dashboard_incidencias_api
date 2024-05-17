import request from "supertest"
import server from "../../server"

describe('POST /api/usuario', () => {
  it('should display validation errors', async () => {
    const response = await request(server).post('/api/usuario').send({})
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(12)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(3)
  })
  it('should display that the nombre is empty', async () => {
    const response = await request(server).post('/api/usuario').send({
      nombre: '',
      apellido: 'Roman',
      telefono: 2010152015,
      email: 'correo@correo.com',
      password: 'sd84$554asd',
      tipoId: 2,
      orgId: 1
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(2)
  })
  it('should display that the apellido is empty', async () => {
    const response = await request(server).post('/api/usuario').send({
      nombre: 'Daniel',
      apellido: '',
      telefono: 2010152015,
      email: 'correo@correo.com',
      password: 'sd84$554asd',
      tipoId: 2,
      orgId: 1
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(2)
  })
  it('should display that the telefono is numeric', async () => {
    const response = await request(server).post('/api/usuario').send({
      nombre: 'Daniel',
      apellido: 'Roman',
      telefono: '435er864ds',
      email: 'correo@correo.com',
      password: 'sd84$554asd',
      tipoId: 2,
      orgId: 1
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(2)
  })
  it('should display that the telefono is length 10', async () => {
    const response = await request(server).post('/api/usuario').send({
      nombre: 'Daniel',
      apellido: 'Roman',
      telefono: '722411820',
      email: 'correo@correo.com',
      password: 'sd84$554asd',
      tipoId: 2,
      orgId: 1
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(2)
  })
  it('should display that the telefono is empty', async () => {
    const response = await request(server).post('/api/usuario').send({
      nombre: 'Daniel',
      apellido: 'Roman',
      telefono: '',
      email: 'correo@correo.com',
      password: 'sd84$554asd',
      tipoId: 2,
      orgId: 1
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(3)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(2)
  })
  it('should display that the email is empty', async () => {
    const response = await request(server).post('/api/usuario').send({
      nombre: 'Daniel',
      apellido: 'Roman',
      telefono: '5550555055',
      email: '',
      password: 'sd84$554asd',
      tipoId: 2,
      orgId: 1
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(2)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(3)
  })
  it('should display that the email is valid email', async () => {
    const response = await request(server).post('/api/usuario').send({
      nombre: 'Daniel',
      apellido: 'Roman',
      telefono: '5550555055',
      email: 'esteesmicorreo',
      password: 'sd84$554asd',
      tipoId: 2,
      orgId: 1
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(3)
  })
  it('should display that the password is empty ', async () => {
    const response = await request(server).post('/api/usuario').send({
      nombre: 'Daniel',
      apellido: 'Roman',
      telefono: '5550555055',
      email: 'correo@correo.com',
      password: '',
      tipoId: 2,
      orgId: 1
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(3)
  })
  it('should display that the tipoId is empty ', async () => {
    const response = await request(server).post('/api/usuario').send({
      nombre: 'Daniel',
      apellido: 'Roman',
      telefono: '5550555055',
      email: 'correo@correo.com',
      password: 'lapasssword',
      tipoId: '',
      orgId: 1
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(2)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(3)
  })
  it('should display that the tipoId is numeric ', async () => {
    const response = await request(server).post('/api/usuario').send({
      nombre: 'Daniel',
      apellido: 'Roman',
      telefono: '5550555055',
      email: 'correo@correo.com',
      password: 'lapasssword',
      tipoId: 'A',
      orgId: 1
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(3)
  })
  it('should display that the orgId is numeric ', async () => {
    const response = await request(server).post('/api/usuario').send({
      nombre: 'Daniel',
      apellido: 'Roman',
      telefono: '5550555055',
      email: 'correo@correo.com',
      password: 'lapasssword',
      tipoId: 1,
      orgId: 'A'
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(3)
  })
  it('should display that the orgId is empty ', async () => {
    const response = await request(server).post('/api/usuario').send({
      nombre: 'Daniel',
      apellido: 'Roman',
      telefono: '5550555055',
      email: 'correo@correo.com',
      password: 'lapasssword',
      tipoId: 1,
      orgId: ''
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(2)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(3)
  })
})

describe('GET /api/usuario', () => {
  it('should check if api/usuario url exists', async () => {
    const response = await request(server).get('/api/usuario')
    expect(response.status).not.toBe(404)
  })
  it('GET a JSON response with usuario', async () => {
    const response = await request(server).get('/api/usuario')
    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch(/json/)
    expect(response.body).toHaveProperty('data')
    expect(response.body.data).toHaveLength(1)
    expect(response.body).not.toHaveProperty('errors')
  })
})

describe('GET /api/usuario/:id', () => {
  it('Should return a 404 response for a non-existent usuario', async () => {
    const usuarioId = 2000
    const response = await request(server).get(`/api/usuario/${usuarioId}`)
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('Usuario No Encontrado')
  })

  it('should check a valid ID in the URL', async () => {
    const response = await request(server).get('/api/usuario/not-valid-url')
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)
    expect(response.body.errors[0].msg).toBe('ID no válido')
  })

  it('get a JSON response for a single usuario', async () => {
    const response = await request(server).get('/api/usuario/1')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')
  })
})

describe('PUT /api/usuario/:id', () => {

  it('should check a valid ID in the URL', async () => {
    const response = await request(server)
      .put('/api/usuario/not-valid-url')
      .send({
        nombre: 'Pedro',
        apellido: 'Roman',
        telefono: 2010152015,
        email: 'correo@correo.com',
        password: 'sd84$554asd',
        tipoId: 2,
        orgId: 1
      })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)
    expect(response.body.errors[0].msg).toBe('ID no válido')
  })

  //   it('should display validation error messages when updating a usuario', async() => {
  //       const response = await request(server).put('/api/usuario/1').send({})

  //       expect(response.status).toBe(400)
  //       expect(response.body).toHaveProperty('errors')
  //       expect(response.body.errors).toBeTruthy()
  //       expect(response.body.errors).toHaveLength(5)

  //       expect(response.status).not.toBe(200)
  //       expect(response.body).not.toHaveProperty('data')
  //   }) 

  //   it('should validate that the price is greater than 0', async() => {
  //       const response = await request(server)
  //                               .put('/api/usuario/1')
  //                               .send({
  //                                   name: "Monitor Curvo",
  //                                   availability: true,
  //                                   price : 0
  //                               })

  //       expect(response.status).toBe(400)
  //       expect(response.body).toHaveProperty('errors')
  //       expect(response.body.errors).toBeTruthy()
  //       expect(response.body.errors).toHaveLength(1)
  //       expect(response.body.errors[0].msg).toBe('Precio no válido')

  //       expect(response.status).not.toBe(200)
  //       expect(response.body).not.toHaveProperty('data')
  //   }) 

  //   it('should return a 404 response for a non-existent product', async() => {
  //       const productId = 2000
  //       const response = await request(server)
  //                               .put(`/api/usuario/${productId}`)
  //                               .send({
  //                                   name: "Monitor Curvo",
  //                                   availability: true,
  //                                   price : 300
  //                               })

  //       expect(response.status).toBe(404)
  //       expect(response.body.error).toBe('Producto No Encontrado')

  //       expect(response.status).not.toBe(200)
  //       expect(response.body).not.toHaveProperty('data')
  //   }) 

  //   it('should update an existing product with valid data', async() => {
  //       const response = await request(server)
  //                               .put(`/api/usuario/1`)
  //                               .send({
  //                                   name: "Monitor Curvo",
  //                                   availability: true,
  //                                   price : 300
  //                               })

  //       expect(response.status).toBe(200)
  //       expect(response.body).toHaveProperty('data')

  //       expect(response.status).not.toBe(400)
  //       expect(response.body).not.toHaveProperty('errors')
  //   }) 


})

// describe('PATCH /api/usuario/:id', () => {
//   it('should return a 404 response for a non-existing product', async () => {
//       const productId = 2000
//       const response = await request(server).patch(`/api/usuario/${productId}`)
//       expect(response.status).toBe(404)
//       expect(response.body.error).toBe('Producto No Encontrado')
//       expect(response.status).not.toBe(200)
//       expect(response.body).not.toHaveProperty('data')
//   })

//   it('should update the product availability', async () => {
//       const response = await request(server).patch('/api/usuario/1')
//       expect(response.status).toBe(200)
//       expect(response.body).toHaveProperty('data')
//       expect(response.body.data.availability).toBe(false)

//       expect(response.status).not.toBe(404)
//       expect(response.status).not.toBe(400)
//       expect(response.body).not.toHaveProperty('error')
//   })
// })

// describe('DELETE /api/usuario/:id', () => {
//   it('should check a valid ID', async () => {
//       const response = await request(server).delete('/api/usuario/not-valid')
//       expect(response.status).toBe(400)
//       expect(response.body).toHaveProperty('errors')
//       expect(response.body.errors[0].msg).toBe('ID no válido')
//   })

//   it('should return a 404 response for a non-existent product', async () => {
//       const productId = 2000
//       const response = await request(server).delete(`/api/usuario/${productId}`)
//       expect(response.status).toBe(404)
//       expect(response.body.error).toBe('Producto No Encontrado')
//       expect(response.status).not.toBe(200)
//   })

//   it('should delete a product', async () => {
//       const response = await request(server).delete('/api/usuario/1')
//       expect(response.status).toBe(200)
//       expect(response.body.data).toBe("Producto Eliminado")

//       expect(response.status).not.toBe(404)
//       expect(response.status).not.toBe(400)
//   })
// })