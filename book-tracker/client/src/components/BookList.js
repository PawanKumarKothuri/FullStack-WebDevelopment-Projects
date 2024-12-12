import React from "react";

const BookList = ({ books, updateBook, deleteBook }) => {
  return (
    <ul>
      {books.map((book) => (
        <li key={book._id}>
          <h3>{book.title}</h3>
          <p>Author: {book.author}</p>
          <p>Genre: {book.genre}</p>
          <p>Status: {book.status}</p>
          <button onClick={() => updateBook(book._id)}>Update Progress</button>
          <button onClick={() => deleteBook(book._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default BookList;
