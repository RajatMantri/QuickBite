const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtSecret = "My-Authourization-Token-Secret";
const User = require('../models/User');

router.get('/users/:token', async (req, res) => {
    const token = req.params.token;
    //console.log(token);

    try {
        const decoded = jwt.verify(token, jwtSecret);
        const userId = decoded.user.id;

        const userData = await User.findById(userId);

        if (!userData) {
            return res.status(404).json({ message: 'User not found' });
        }

        //console.log(userData);
        res.status(200).json(userData);
        
    } catch (error) {
        console.error("Error verifying token:", error);
        res.status(401).json({ message: 'Token verification failed' });
    }
});

module.exports = router;
