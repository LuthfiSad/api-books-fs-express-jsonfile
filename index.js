const jsonServer = require('json-server');
const path = require('path');
const { customMiddleware, apiPrefix } = require('./middlewares.js');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'books.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(apiPrefix);
server.use(jsonServer.bodyParser);

// Use custom middleware
server.use((req, res, next) => customMiddleware(req, res, next, router));

// Use router after custom middleware
server.use(router);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});

module.exports = server;