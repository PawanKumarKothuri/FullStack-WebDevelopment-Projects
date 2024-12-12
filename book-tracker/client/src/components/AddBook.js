import React, { useState } from "react";

const AddBook = ({ addBook }) => {
  const [book, setBook] = useState({ title: "", author: "", genre: "", status: "Want to Read" });

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook(book);
    setBook({ title: "", author: "", genre: "", status: "Want to Read" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={book.title}
        onChange={(e) => setBook({ ...book, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Author"
        value={book.author}
        onChange={(e) => setBook({ ...book, author: e.target.value })}
      />
      <input
        type="text"
        placeholder="Genre"
        value={book.genre}
        onChange={(e) => setBook({ ...book, genre: e.target.value })}
      />
      <select
        value={book.status}
        onChange={(e) => setBook({ ...book, status: e.target.value })}
      >
        <option>Want to Read</option>
        <option>Currently Reading</option>
        <option>Finished Reading</option>
      </select>
      <button type="submit">Add Book</button>
    </form>
  );
};

export default AddBook;
