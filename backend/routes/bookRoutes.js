const express = require('express');
const router = express.Router();

const {
    getBooks,
    getBookbyId,
    createBook,
    updateBook,
    deleteBook,
  } = require('../controllers/bookController');

router.get('/books',getBooks);

router.get('/books/:id',getBookbyId);

router.post('/books',createBook);

router.put('/books/:id',updateBook);

router.delete('/books/:id',deleteBook);

module.exports = router;