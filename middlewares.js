const jsonServer = require('json-server');
const { formatInTimeZone } = require('date-fns-tz');

// Function to get Indonesia time
const getIndonesiaTime = () => {
  const timeZone = 'Asia/Jakarta';
  const date = new Date();
  return formatInTimeZone(date, timeZone, 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\'');
};

// Create a middleware to handle specific routes

const customMiddleware = (req, res, next, router) => {
  if (req.method === 'POST' && req.path === '/books/donate') {
    req.body.createdAt = getIndonesiaTime();
    req.body.borrowCount = 0;
    req.body.id = Date.now();
    
    // Manually add the new book to the database
    const db = router.db; // Get lowdb instance
    db.get('books')
    .push(req.body)
    .write();
    
    return res.status(201).json(req.body);
  }
  next();
};


// Middleware to prefix /api
const apiPrefix = jsonServer.rewriter({
  '/api/*': '/$1',
});

module.exports = {
  customMiddleware,
  apiPrefix
};
