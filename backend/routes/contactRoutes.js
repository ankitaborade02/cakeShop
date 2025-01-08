const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');  // Check the path

// POST /contact
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        // Ensure all fields are being sent
        if (!name || !email || !message) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newContact = new Contact({ name, email, phone, message });
        await newContact.save();
        res.status(201).json({ message: 'Contact saved successfully' });
    } catch (error) {
        console.error('Error saving contact:', error);
        res.status(500).json({ message: 'Error saving contact', error: error.message });
    }
});

module.exports = router;
