const express = require('express');
const router = express.Router();

const{
    getAllBorrow,
    getBorrowById,
    createBorrow,
    deleteBorrow,
    changeStatustoBorrow,
    changeStatustoReturn
} = require('../controllers/borrowController');

router.get('/borrow',getAllBorrow);

router.get('/borrow/:id',getBorrowById);

router.post('/borrow',createBorrow);

router.put('/borrow/:id/changeStatustoBorrow',changeStatustoBorrow);

router.put('/borrow/:id/changeStatustoReturn',changeStatustoReturn)

router.delete('/borrow/:id',deleteBorrow);

module.exports = router;