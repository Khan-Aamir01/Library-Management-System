const express = require('express');
const router = express.Router();

const{
    getAllBorrow,
    getBorrowById,
    createBorrow,
    deleteBorrow,
    changeBorrowStatus
} = require('../controllers/borrowController');

router.get('/borrow',getAllBorrow);

router.get('/borrow/:id',getBorrowById);

router.post('/borrow',createBorrow);

router.patch('/borrow/:id/changeBorrowStatus',changeBorrowStatus);

router.delete('/borrow/:id',deleteBorrow);

module.exports = router;