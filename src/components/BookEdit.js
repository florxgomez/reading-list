import { useState } from "react";
import { convertToBase64 } from "../image-utils";
import useBooksContext from "../hooks/use-books-context";

const BookEdit = ({ book, onSubmit }) => {
  const { editBookById } = useBooksContext();

  const [title, setTitle] = useState(book.title);
  const [image, setImage] = useState(book.image);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
    editBookById(book.id, title, image);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setImage(base64);
  };

  return (
    <form className="book-edit" onSubmit={handleSubmit}>
      <label>Title</label>
      <input
        className="input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input type="file" name="image" onChange={handleFileUpload} />
      <button className="button is-primary">Save</button>
    </form>
  );
};

export default BookEdit;
