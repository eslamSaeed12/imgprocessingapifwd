import supertest from 'supertest'
import { app } from '../src/app'
import type { Server } from 'http'

const uri = 'http://localhost:4000'

// setting up supertest with a server url
const request = supertest(uri)

// defining an http server to run the app
let server: Server | null = null

beforeAll(() => {
  // assigning an http server and run it before all tests
  server = app.listen(4000)
})

describe('End Points Test Suites', () => {
  it('should return 200 status code', async () => {
    const response = await request.get('/')
    expect(response.status).toBe(200)
  })

  it('should return 200 status code with an image', () => {
    return request
      .get('/api/images?filename=fjord.jpg&width=200&height=200')
      .expect(200)
      .expect('Content-Type', /image\/jpeg/)
  })

  it('should return 404 status code with an image', () => {
    return request
      .get('/api/images?filename=notexist.jpg&width=200&height=200')
      .expect(404)
  })

  it('should return 400 when no filename', () => {
    return request.get('/api/images').expect(400)
  })

  it('should return 400 when no width or height', () => {
    return request.get('/api/images?filename=fjord.jpg').expect(400)
  })
})

afterAll(() => {
  server?.close()
})
