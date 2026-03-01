import React, { useEffect, useState, useCallback } from "react";
import BookService from "../services/BookService";
import Book from "./Book";

const VIEW_STORAGE_KEY = "react-book-list-view";
const PAGE_SIZE = 20;

const loadViewPreference = () => {
  try {
    const v = localStorage.getItem(VIEW_STORAGE_KEY);
    return v === "table" ? "table" : "cards";
  } catch {
    return "cards";
  }
};

const saveViewPreference = (view) => {
  try {
    localStorage.setItem(VIEW_STORAGE_KEY, view);
  } catch (_) {}
};

function SkeletonCard() {
  return (
    <div className="book-skeleton d-flex flex-column align-items-center">
      <div className="book-skeleton-cover" />
      <div className="book-skeleton-title" />
      <div className="book-skeleton-author" />
    </div>
  );
}

const BookList = ({ favorites = [], onRate }) => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("the lord of the rings");
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [numFound, setNumFound] = useState(0);
  const [viewMode, setViewMode] = useState(loadViewPreference);

  const hasMore = books.length < numFound;

  const getRating = useCallback(
    (bookKey) => {
      const f = favorites.find((x) => x.key === bookKey);
      return f && f.rating ? f.rating : 0;
    },
    [favorites]
  );

  useEffect(() => {
    if (!query.trim()) {
      setBooks([]);
      setNumFound(0);
      setOffset(0);
      return;
    }
    setLoading(true);
    setOffset(0);
    BookService.fetchBooks(query, { limit: PAGE_SIZE, offset: 0 })
      .then((data) => {
        setBooks(data.docs || []);
        setNumFound(data.numFound ?? 0);
      })
      .catch(() => {
        setBooks([]);
        setNumFound(0);
      })
      .finally(() => setLoading(false));
  }, [query]);

  const loadMore = () => {
    if (!query.trim() || loadingMore || !hasMore) return;
    const nextOffset = books.length;
    setLoadingMore(true);
    BookService.fetchBooks(query, { limit: PAGE_SIZE, offset: nextOffset })
      .then((data) => {
        const docs = data.docs || [];
        setBooks((prev) => [...prev, ...docs]);
      })
      .finally(() => setLoadingMore(false));
  };

  const setView = (mode) => {
    setViewMode(mode);
    saveViewPreference(mode);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const value = e.target.elements.search.value?.trim() ?? "";
    setQuery(value || "the lord of the rings");
  };

  return (
    <section>
      <div className="container d-flex flex-column align-items-center my-4 search-and-display">
        <h2
          className="buscarTitle mb-4 text-center w-100"
          style={{ display: "flex", justifyContent: "center" }}
        >
          Search Books
        </h2>
        <form
          onSubmit={handleSearch}
          className="d-flex justify-content-center align-items-center search-form"
          style={{ maxWidth: 600, width: "100%" }}
        >
          <input
            type="text"
            name="search"
            className="form-control me-2"
            placeholder="Search book..."
            defaultValue={query}
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>
        {!loading && books.length > 0 && (
          <div className="display-mode">
            <span className="display-mode-label">Display mode:</span>
            <div className="view-toggle">
              <button
                type="button"
                className={viewMode === "cards" ? "active" : ""}
                onClick={() => setView("cards")}
              >
                Card
              </button>
              <button
                type="button"
                className={viewMode === "table" ? "active" : ""}
                onClick={() => setView("table")}
              >
                Table
              </button>
            </div>
          </div>
        )}
      </div>

      {loading && (
        <div className="booklist">
          {Array.from({ length: 9 }, (_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {!loading && viewMode === "cards" && (
        <>
          <div className="booklist">
            {books.map((book) => (
              <Book
                key={book.key}
                book={book}
                currentRating={getRating(book.key)}
                onRate={onRate}
                variant="card"
              />
            ))}
          </div>
          {hasMore && (
            <div className="text-center my-4">
              <button
                type="button"
                className="btn btn-load-more"
                onClick={loadMore}
                disabled={loadingMore}
              >
                {loadingMore ? "Loading…" : "Load more"}
              </button>
            </div>
          )}
        </>
      )}

      {!loading && viewMode === "table" && books.length > 0 && (
        <div className="booklist-table">
          <table>
            <thead>
              <tr>
                <th>Cover</th>
                <th>Title</th>
                <th>Author</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <Book
                  key={book.key}
                  book={book}
                  currentRating={getRating(book.key)}
                  onRate={onRate}
                  variant="table"
                />
              ))}
            </tbody>
          </table>
          {hasMore && (
            <div className="text-center p-3">
              <button
                type="button"
                className="btn btn-load-more"
                onClick={loadMore}
                disabled={loadingMore}
              >
                {loadingMore ? "Loading…" : "Load more"}
              </button>
            </div>
          )}
        </div>
      )}

      {!loading && books.length === 0 && query && (
        <p className="text-center text-white">No books found. Try another search.</p>
      )}
    </section>
  );
};

export default BookList;
