const jsonServer = require('json-server');
const path = require('path');
const { formatInTimeZone } = require('date-fns-tz');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'books.json'));
const middlewares = jsonServer.defaults();

const apiPrefix = jsonServer.rewriter({
  '/api/*': '/$1',
});

server.use(middlewares);
server.use(apiPrefix);
server.use(jsonServer.bodyParser);


const getIndonesiaTime = () => {
  const timeZone = 'Asia/Jakarta';
  const date = new Date();
  return formatInTimeZone(date, timeZone, 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\'');
};

server.post('/books/donate', (req, res) => {
  const db = router.db;
  
  req.body.createdAt = getIndonesiaTime();
  req.body.borrowCount = 0;
  req.body.id = Date.now();
  
  // Write to the in-memory database
  db.get('books').push(req.body).write();
  
  return res.status(201).json(req.body);
});

// Handle PUT request to update a book
server.put('/books/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const updatedBook = req.body;
  const db = router.db; // LowDB instance
  const book = db.get('books').find({ id }).value();
  // return res.status(405).json(book);

  if (book) {
    db.get('books').find({ id }).assign(updatedBook).write();
    res.status(200).json({ message: `Book with ID ${id} updated successfully.` });
  } else {
    res.status(404).json({ error: 'Book not found.' });
  }
});

// Handle DELETE request to delete a book
server.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const db = router.db; // LowDB instance
  const book = db.get('books').find({ id }).value();

  if (book) {
    db.get('books').remove({ id }).write();
    res.status(200).json({ message: `Book with ID ${id} deleted successfully.` });
  } else {
    res.status(404).json({ error: 'Book not found.' });
  }
});

// Use router after custom middleware
server.use(router);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});

module.exports = server;
