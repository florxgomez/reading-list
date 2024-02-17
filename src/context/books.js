import { createContext, useState, useCallback } from "react";
import axios from "axios";

const BooksContext = createContext();

function Provider({ children }) {
  const [books, setBooks] = useState([]);

  const fetchBooks = useCallback(async () => {
    const res = await axios.get("http://localhost:3001/books");
    setBooks(res.data);
  }, []);

  const createBook = async (title, image) => {
    const res = await axios.post("http://localhost:3001/books", {
      title,
      image,
    });
    setBooks([...books, res.data]);
  };

  const editBookById = async (id, title, image) => {
    const res = await axios.put(`http://localhost:3001/books/${id}`, {
      title,
      image,
    });

    setBooks(
      books.map((book) => (book.id === id ? { ...book, ...res.data } : book))
    );
  };

  const deleteBookById = async (id) => {
    await axios.delete(`http://localhost:3001/books/${id}`);
    setBooks(books.filter((book) => id !== book.id));
  };

  return (
    <BooksContext.Provider
      value={{ books, fetchBooks, createBook, editBookById, deleteBookById }}
    >
      {children}
    </BooksContext.Provider>
  );
}

export { Provider };
export default BooksContext;
