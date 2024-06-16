const jsonServer = require('json-server')
const { formatInTimeZone } = require('date-fns-tz')

// Function to get Indonesia time
const getIndonesiaTime = () => {
  const timeZone = 'Asia/Jakarta'
  const date = new Date()
  return formatInTimeZone(date, timeZone, 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\'')
}

// Create a middleware to handle specific routes
const customMiddleware = (req, res, next) => {
  if (req.method === 'POST' && req.path === '/api/books/donate') {
    req.body.createdAt = getIndonesiaTime()
    req.body.borrowCount = 0
    req.body.id = Date.now()
  }
  next()
}

// Middleware to prefix /api
const apiPrefix = jsonServer.rewriter({
  '/api/*': '/$1',
})

module.exports = {
  customMiddleware,
  apiPrefix
}
