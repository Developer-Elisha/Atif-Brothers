const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { verifyToken, authorizeRole } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user', verifyToken, (req, res) => res.json({ message: `Welcome, user ${req.user.id}` }));
router.get('/admin', verifyToken, authorizeRole(['admin']), (req, res) => res.json({ message: `Welcome, admin ${req.user.id}` }));

module.exports = router;
