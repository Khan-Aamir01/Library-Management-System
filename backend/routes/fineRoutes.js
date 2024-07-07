const express = require('express');
const router = express.Router();

const {
    getAllFine,
    getFineById,
    createFine,
    updateFine,
    deleteFine
} = require('../controllers/fineController');

router.get('/fine',getAllFine);

router.get('/fine/:id',getFineById);

router.post('/fine',createFine);

router.put('/fine/:id',updateFine);

router.delete('/fine/:id',deleteFine);

module.exports = router;