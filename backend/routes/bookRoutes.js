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

router.get('/',getBooks);

router.get('/latest',latestBook);

router.get('/popular',popularBook); 

router.get('/:id',getBookbyId);

router.get('/category/:category',getCategory);// ex: category/School  => it will return all School Books

router.post('/',createBook);

router.put('/:id',updateBook);

router.delete('/:id',deleteBook);

module.exports = router;