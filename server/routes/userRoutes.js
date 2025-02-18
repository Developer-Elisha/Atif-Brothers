const express = require('express');
const { deleteAllUsers } = require('../controllers/userController');
const protect = require('../middlewares/authMiddleware');
const router = express.Router();

router.delete('/delete-all', protect, deleteAllUsers);

module.exports = router;
