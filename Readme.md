# Books API

This project is a simple Books API built using Node.js, Express, and the filesystem (fs) module. It allows you to fetch, update, and add new books to a local JSON file. The project is designed to be easily deployable to Vercel.

## Features

- Fetch a list of all books.
- Update book details by ID.
- Add a new book to the list.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed Node.js and npm.
- You have a basic understanding of JavaScript and Node.js.
- You have a GitHub account to deploy the app on Vercel.

## Getting Started

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/books-api.git
   cd books-api
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5000
   ```

### Running the Server

To start the server locally, run:
```sh
npm start
```

The server will run on `http://localhost:5000`.

### API Endpoints

- **Get all books**: `GET /api/books`
- **Update a book by ID**: `PUT /api/books/:id`
- **Add a new book**: `POST /api/books/donate`

### Example API Usage

#### Get All Books
```sh
curl http://localhost:5000/api/books
```

#### Update a Book
```sh
curl -X PUT http://localhost:5000/api/books/1 -H "Content-Type: application/json" -d '{"title":"New Title","author":"New Author","description":"Updated description","year":2021,"publisher":"New Publisher","genre":"New Genre","booksCount":10,"pageCount":300,"image":"new-image-url","borrowCount":0,"createdAt":"2024-06-15T09:30:00Z"}'
```

#### Add a New Book
```sh
curl -X POST http://localhost:5000/api/books/donate -H "Content-Type: application/json" -d '{"title":"New Book","author":"Author Name","description":"Book description","year":2024,"publisher":"Publisher","genre":"Genre","booksCount":5,"pageCount":350,"image":"image-url"}'
```

## Project Structure

```
books-api/
├── .env
├── .gitignore
├── books.json
├── index.js
├── package.json
└── README.md
```
