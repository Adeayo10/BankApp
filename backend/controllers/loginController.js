const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({where: {email}});
        if (!user) {
            return res.status(400).json({message: 'User not found'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: 'Incorrect password'});
        }
        const payload = {
            user: {
                id: user.id
            }
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role }, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { login };