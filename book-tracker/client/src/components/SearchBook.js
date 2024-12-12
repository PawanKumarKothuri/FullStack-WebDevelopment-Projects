import React, { useState } from "react";
import axios from "axios";

const SearchBook = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);

  // Fetch books from Google Books API
  const fetchBooks = async () => {
    const apiKey = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY; // Access API key from .env
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`;

    try {
      const response = await axios.get(apiUrl);
      setBooks(response.data.items || []); // Set fetched books
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBooks();
  };

  return (
    <div>
      <h2>Search for Books</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter book title or author"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div>
        <h3>Search Results:</h3>
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <h4>{book.volumeInfo.title}</h4>
              <p>{book.volumeInfo.authors?.join(", ")}</p>
              <p>{book.volumeInfo.publishedDate}</p>
              <button>Add to Collection</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchBook;
