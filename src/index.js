const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const  { formatInTimeZone } = require('date-fns-tz');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const booksFilePath = path.join(__dirname, './books.json');

const getIndonesiaTime = () => {
  const timeZone = 'Asia/Jakarta';
  const date = new Date();
  return formatInTimeZone(date, timeZone, 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\'');
};

app.get('/api/books', (req, res) => {
  fs.readFile(booksFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading books file');
    }
    res.send(JSON.parse(data));
  });
});

// Endpoint untuk mengupdate buku berdasarkan ID
app.put('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const updatedBook = req.body;

  fs.readFile(booksFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading books file:', err);
      return res.status(500).send('Error reading books file');
    }
    try {
      let books = JSON.parse(data);

      const bookIndex = books.findIndex(book => book.id === bookId);
      if (bookIndex === -1) {
        return res.status(404).send('Book not found');
      }

      // Perbarui buku yang sesuai dengan ID
      books[bookIndex] = updatedBook;

      // Tulis kembali ke books.json
      fs.writeFile(booksFilePath, JSON.stringify(books, null, 2), (err) => {
        if (err) {
          console.error('Error writing books file:', err);
          return res.status(500).send('Error writing books file');
        }
        
        res.send({
          message: 'Book updated successfully',});
      });
    } catch (parseError) {
      console.error('Error parsing books file:', parseError);
      return res.status(500).send('Error parsing books file');
    }
  });
});

// Endpoint untuk menambahkan buku baru
app.post('/api/books/donate', (req, res) => {
  const newBook = req.body;
  newBook.id = Date.now();
  newBook.borrowCount = 0;
  newBook.createdAt = getIndonesiaTime();

  fs.readFile(booksFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading books file:', err);
      return res.status(500).send('Error reading books file');
    }
    try {
      let books = JSON.parse(data);

      // Tambahkan buku baru ke daftar
      books.push(newBook);

      // Tulis kembali ke books.json
      fs.writeFile(booksFilePath, JSON.stringify(books, null, 2), (err) => {
        if (err) {
          console.error('Error writing books file:', err);
          return res.status(500).send('Error writing books file');
        }

        res.status(201).send(newBook);
      });
    } catch (parseError) {
      console.error('Error parsing books file:', parseError);
      return res.status(500).send('Error parsing books file');
    }
  });
});


app.get("/", (req, res) => {
  res.send("ini Link API Books nya <a href='/api/books'>Link</a>");
});

// Jalankan server di port 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;