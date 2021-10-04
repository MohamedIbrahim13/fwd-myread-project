import { Link } from "react-router-dom";
import BookDetails from "./BookDetails";
import Add from "../icons/add.svg";

//import { PropTypes } from 'prop-types';

const BookList = ({ books, handleChange }) => {
  const currBook = books.filter(book => book.shelf === "currentlyReading");
  const wantToRead = books.filter(book => book.shelf === "wantToRead");
  const readBook = books.filter(book => book.shelf === "read");

  const booksView = (books, head) => {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{head}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book => (
              <BookDetails
                key={book.id}
                book={book}
                handleChange={handleChange}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  };
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {booksView(currBook, "Currently Reading Books")}
          {booksView(wantToRead, "Want to Read Books")}
          {booksView(readBook, "Read Books")}
        </div>
      </div>

      <div className="open-search">
        <Link to="/search">
          <img src={Add} alt="add button" className="book-shelf-changer" />
        </Link>
      </div>
    </div>
  );
};

export default BookList;
