import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [googleBooks, setGoogleBooks] = useState([]);

  // Fetch books from the backend
  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Fetch books from Google Books API
  const fetchGoogleBooks = async (query) => {
    if (!query) return;
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}`
      );
      setGoogleBooks(response.data.items || []);
    } catch (error) {
      console.error("Error fetching books from Google API:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    fetchGoogleBooks(event.target.value);
  };

  return (
    <div>
      <h1>Book Tracking App</h1>

      {/* Search Bar */}
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search for books..."
      />

      {/* Display Backend Books */}
      <h2>Saved Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>

      {/* Display Google Books Results */}
      <h2>Google Books Results</h2>
      <ul>
        {googleBooks.map((book) => (
          <li key={book.id}>{book.volumeInfo.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
