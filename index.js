const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Replace with your actual MongoDB Atlas connection string
const mongoURI = 'mongodb+srv://clintpause:cwuEVi0AozcirrKg@cluster0.atamgy0.mongodb.net/';

// Connect to MongoDB Atlas
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

// Define a simple schema and model for testing
const TestSchema = new mongoose.Schema({
    name: String,
    message: String
});

const TestModel = mongoose.model('Test', TestSchema);

// POST API - Create a new test document
app.post('/api/test/post', async (req, res) => {
    try {
        const { name, message } = req.body;
        const newDoc = new TestModel({ name, message });
        const savedDoc = await newDoc.save();
        res.status(201).json(savedDoc);
    } catch (err) {
        res.status(500).json({ error: 'Failed to save document', details: err.message });
    }
});

// GET API - Retrieve all test documents
app.get('/api/test/get', async (req, res) => {
    try {
        const docs = await TestModel.find();
        res.status(200).json(docs);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch documents', details: err.message });
    }
});
app.get('/api/test', async (req, res) => {
    try {
        res.status(200).json({message: 'Hello its working'});
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch documents', details: err.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
