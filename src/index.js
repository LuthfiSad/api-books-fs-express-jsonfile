const jsonServer = require('json-server')
const path = require('path')
const { customMiddleware, apiPrefix } = require('./middlewares.js')

const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'books.json'))
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(apiPrefix)
server.use(jsonServer.bodyParser)

// Use custom middleware
server.use(customMiddleware)

server.use(router)
server.listen(5000, () => {
  console.log('JSON Server is running on port 5000')
})

module.exports = server