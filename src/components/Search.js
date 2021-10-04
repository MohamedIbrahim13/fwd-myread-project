import { useState } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./../BooksAPI";
import BookDetails from "./BookDetails";

//import PropTypes from 'prop-types';

const Search = ({ items, handleChange }) => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState(false);
  const handleSearch = e => {
    setQuery(e.target.value);
    handleUpdateSearch(e.target.value);
  };
  const handleChangeShelf = books => {
    books.forEach(book => {
      book.shelf = "none";
      items.forEach(item => {
        if (item.id === book.id) {
          book.shelf = item.shelf;
        }
      });
    });
    return books;
  };
  const handleUpdateSearch = query => {
    if (query) {
      BooksAPI.search(query).then(result => {
        if (result.length > 0) {
          result = handleChangeShelf(result);
          setBooks(result);
          setError(false);
        } else {
          setBooks([]);
          setError(true);
        }
      });
    } else {
      setBooks([]);
      setError(false);
    }
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            autoFocus
            type="text"
            placeholder="Search books by title or author"
            value={query}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="search-books-results">
        {books.length > 0 && (
          <div>
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
        )}
        {error && <div> No Books Available </div>}
      </div>
    </div>
  );
};

export default Search;
