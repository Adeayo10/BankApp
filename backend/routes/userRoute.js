const express = require('express');
const authenticateToken = require('../middleware/middleware');
const router = express.Router();
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

router.post('/create', /*authenticateToken*/ createUser);
router.get('/all', authenticateToken, getUsers);
router.get('/:id',authenticateToken, getUserById);
router.put('/:id',authenticateToken, updateUser);
router.delete('/:id',authenticateToken, deleteUser);

module.exports = router;