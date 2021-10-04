import { useState, useEffect } from "react";
import BookList from "./components/BookList";
import Search from "./components/Search";
import * as BooksAPI from "./BooksAPI";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    BooksAPI.getAll().then(result => {
      setBooks(result);
    });
  }, []);
  const handleChange = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(() => {
        book.shelf = shelf;
        setBooks(prevState =>
          prevState.filter(c => c.id !== book.id).concat(book)
        );
      })
      .then(() =>
        shelf !== "none" ? alert(`${book.authors} add successfully`) : null
      )
      .catch(() => alert("Bad request"));
  };
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            component={() => (
              <BookList books={books} handleChange={handleChange} />
            )}
          />
          <Route
            path="/search"
            component={() => (
              <Search items={books} handleChange={handleChange} />
            )}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
