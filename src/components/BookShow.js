import { useState } from "react";
import BookEdit from "./BookEdit";
import useBooksContext from "../hooks/use-books-context";

const BookShow = ({ book }) => {
  const { deleteBookById } = useBooksContext();

  const [showEdit, setShowEdit] = useState(false);

  const handleSubmit = () => {
    setShowEdit(false);
  };

  return (
    <div>
      <div className="book-show">
        {showEdit ? (
          <BookEdit book={book} onSubmit={handleSubmit} />
        ) : (
          <>
            <img src={book.image} alt={book.title} className="img" />
            <h3>{book.title}</h3>
          </>
        )}

        <div className="actions">
          <button onClick={() => setShowEdit(!showEdit)} className="edit">
            Edit
          </button>
          <button className="delete" onClick={() => deleteBookById(book.id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookShow;
