const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, match: [/\S+@\S+\.\S+/, 'is invalid'] },
    phone: { type: String, trim: true },  // Optional
    message: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Contact', contactSchema);
