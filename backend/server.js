const express = require('express');
const mongoose = require('mongoose');
const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes'); // New authentication routes
const cors = require('cors'); // Add CORS support if needed

const app = express();

app.use(cors());  // Enable CORS for frontend to access backend

app.use(express.json());  // For parsing application/json

// API route for contact form
app.use('/contact', contactRoutes);

// API routes for authentication (register & login)
app.use('/auth', authRoutes);

// Fallback route for unmatched paths
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// MongoDB connection string
const mongoURI = 'mongodb+srv://ankita:ankita02@cluster0.rl4mv.mongodb.net/cakeDB?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => {
        console.log('Error connecting to MongoDB:', err);
        process.exit(1);  // Exit the process if MongoDB connection fails
    });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
