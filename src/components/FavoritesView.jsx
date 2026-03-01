import React, { useState } from "react";
import Book from "./Book";

const VIEW_STORAGE_KEY = "react-book-list-view";

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

const FavoritesView = ({ favorites, onRate, onBack }) => {
  const [viewMode, setViewMode] = useState(loadViewPreference);

  const setView = (mode) => {
    setViewMode(mode);
    saveViewPreference(mode);
  };

  if (favorites.length === 0) {
    return (
      <section className="favorites-view">
        <h2 className="title text-center w-100 my-4">Favorites</h2>
        <p className="text-center text-white favorites-empty">
          No favorite books yet. Search and add some.
        </p>
        {onBack && (
          <div className="text-center mt-3">
            <button
              type="button"
              className="btn btn-outline-light"
              onClick={onBack}
            >
              Go to Search
            </button>
          </div>
        )}
      </section>
    );
  }

  return (
    <section className="favorites-view">
      <h2 className="title text-center w-100 my-4">Favorites</h2>
      <div className="container d-flex flex-column align-items-center mb-4">
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
      </div>

      {viewMode === "cards" && (
        <div className="booklist">
          {favorites.map((f) => (
            <Book
              key={f.key}
              book={f}
              currentRating={f.rating ?? 1}
              onRate={onRate}
              variant="card"
            />
          ))}
        </div>
      )}

      {viewMode === "table" && (
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
              {favorites.map((f) => (
                <Book
                  key={f.key}
                  book={f}
                  currentRating={f.rating ?? 1}
                  onRate={onRate}
                  variant="table"
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default FavoritesView;
