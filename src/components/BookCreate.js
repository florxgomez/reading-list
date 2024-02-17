import { useState } from "react";
import { convertToBase64 } from "../image-utils";
import useBooksContext from "../hooks/use-books-context";

const BookCreate = () => {
  const { createBook } = useBooksContext();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    createBook(title, image);
    setTitle("");
    setImage(null);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setImage(base64);
  };

  return (
    <div className="book-create">
      <h3>Add a Book</h3>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input type="file" name="image" onChange={handleFileUpload} />
        <button className="button">Create</button>
      </form>
    </div>
  );
};

export default BookCreate;
