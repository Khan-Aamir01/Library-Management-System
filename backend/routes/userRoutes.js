const express = require('express');
const router = express.Router();

const {
    getAllUser,
    getUserbyID,
    createUser,
    updateUser,
    deleteUser,
} = require('../controllers/userController')

router.get('/user',getAllUser);

router.get('/user/:id',getUserbyID);

router.post('/user',createUser);

router.put('/user/:id',updateUser);

router.delete('/user/:id',deleteUser);

module.exports = router;