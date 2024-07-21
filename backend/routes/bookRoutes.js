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
    updateDownload,
    changeAvailability,
  } = require('../controllers/bookController');

router.get('/',getBooks);

router.get('/latest',latestBook);

router.get('/popular',popularBook); 

router.get('/:id',getBookbyId);

router.get('/category/:category',getCategory);// ex: category/School  => it will return all School Books

router.post('/',createBook);

router.put('/:id/:status',changeAvailability); //ex: http://localhost:3000/api/books/6698041cd5b9e19f41aef1ef/decrement or increment

router.put('/:id/updateDownload',updateDownload);

router.put('/:id',updateBook);

router.delete('/:id',deleteBook);

module.exports = router;