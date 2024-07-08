const express = require('express');
const router = express.Router();

const {
    getBooks,
    getBookbyId,
    createBook,
    updateBook,
    deleteBook,
    latestBook,
    popularBook,
    getCategory
  } = require('../controllers/bookController');

router.get('/books',getBooks);

router.get('/books/:id',getBookbyId);

router.post('/books',createBook);

router.put('/books/:id',updateBook);

router.delete('/books/:id',deleteBook);

router.get('/latestBook',latestBook); // /books/latestBook is not working for some reason

router.get('/popularBook',popularBook); 

router.get('/category/:category',getCategory); // Same ex: category/School  => it will return all School Books
//It should be /books/category/:category but its not working 

module.exports = router;