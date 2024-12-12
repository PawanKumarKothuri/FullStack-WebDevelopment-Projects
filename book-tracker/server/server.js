const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB ClusterBookTracker'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Book Schema
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: String,
  status: { type: String, enum: ['Want to Read', 'Currently Reading', 'Finished Reading'], default: 'Want to Read' },
  progress: { type: Number, default: 0 }, // Represents percentage or pages read
});

const Book = mongoose.model('Book', bookSchema);

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Book Tracker API');
});

// Fetch all books
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error });
  }
});

// Add a new book
app.post('/api/books', async (req, res) => {
  const { title, author, genre, status, progress } = req.body;
  try {
    const newBook = new Book({ title, author, genre, status, progress });
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ message: 'Error adding book', error });
  }
});

// Update a book
app.put('/api/books/:id', async (req, res) => {
  const { id } = req.params;
  const { title, author, genre, status, progress } = req.body;
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, author, genre, status, progress },
      { new: true }
    );
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: 'Error updating book', error });
  }
});

// Delete a book
app.delete('/api/books/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Book.findByIdAndDelete(id);
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book', error });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
