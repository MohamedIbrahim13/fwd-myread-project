//import PropTypes from "prop-types";

const BookDetails = ({ book, handleChange }) => {
  const updateShelf = e => {
    handleChange(book, e.target.value);
  };
  const bookImg = book.imageLinks ? book.imageLinks.thumbnail : null;

  return (
    <div>
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${bookImg})`,
              }}
            ></div>
            <div className="book-shelf-changer">
              <select onChange={updateShelf} value={book.shelf}>
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors}</div>
        </div>
      </li>
    </div>
  );
};

// ListBooksView.propTypes = {
// 	clickShelfHandler: PropTypes.func.isRequired,
// };

export default BookDetails;
