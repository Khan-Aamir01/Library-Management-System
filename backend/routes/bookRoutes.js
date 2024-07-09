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
    getCategory,
    getStatus
  } = require('../controllers/bookController');

router.get('/',getBooks);

router.get('/latest',latestBook);

router.get('/popular',popularBook); 

router.get('/:id',getBookbyId);

router.get('/status/:status',getStatus); // /books/status/Waiting => it will return all waiting books

router.get('/category/:category',getCategory);// ex: category/School  => it will return all School Books

router.post('/',createBook);

router.put('/:id',updateBook);

router.delete('/:id',deleteBook);

module.exports = router;