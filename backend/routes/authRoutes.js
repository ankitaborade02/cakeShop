const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user'); // Assuming User model is defined in ../models/User.js
const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, phone } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already registered' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ username, email, password: hashedPassword, phone });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error registering user', details: error });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        res.status(200).json({ message: 'Login successful', user: { username: user.username, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in', details: error });
    }
});

module.exports = router;
