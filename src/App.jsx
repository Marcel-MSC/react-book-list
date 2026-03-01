import React, { useState, useCallback } from "react";
import BookList from "./components/BookList";
import FavoritesView from "./components/FavoritesView";

const FAVORITES_STORAGE_KEY = "react-book-list-favorites";

const loadFavorites = () => {
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return list.map((f) => ({
      ...f,
      rating: Math.min(5, Math.max(1, f.rating || 1)),
    }));
  } catch {
    return [];
  }
};

const saveFavorites = (list) => {
  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(list));
  } catch (_) {}
};

const bookToFavorite = (book, rating) => ({
  key: book.key,
  title: book.title,
  author_name: book.author_name,
  cover_i: book.cover_i,
  rating: Math.min(5, Math.max(1, rating)) || 1,
});

function App() {
  const [view, setView] = useState("search");
  const [favorites, setFavorites] = useState(loadFavorites);

  const handleRate = useCallback((book, rating) => {
    const fav = bookToFavorite(book, rating);
    const key = fav.key;
    setFavorites((prev) => {
      const next =
        rating === 0
          ? prev.filter((f) => f.key !== key)
          : prev.some((f) => f.key === key)
            ? prev.map((f) => (f.key === key ? { ...f, rating } : f))
            : [...prev, fav];
      saveFavorites(next);
      return next;
    });
  }, []);

  return (
    <>
      <header className="app-topbar">
        <h1 className="app-topbar-title">React Book List</h1>
        <nav className="app-topbar-nav">
          {view === "favorites" ? (
            <button
              type="button"
              className="btn btn-outline-light btn-sm"
              onClick={() => setView("search")}
            >
              Search
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-outline-light btn-sm app-favorites-btn"
              onClick={() => setView("favorites")}
            >
              Favorites ({favorites.length})
            </button>
          )}
        </nav>
      </header>
      <main>
        {view === "search" && (
          <>
            <h2 className="title text-center w-100 my-4">
              Search books on Open Library
            </h2>
            <BookList
              favorites={favorites}
              onRate={handleRate}
            />
          </>
        )}
        {view === "favorites" && (
          <FavoritesView
            favorites={favorites}
            onRate={handleRate}
            onBack={() => setView("search")}
          />
        )}
      </main>
      <footer className="app-footer">
        <span className="app-footer-author">
          Author: Marcelo Marcos Siqueira Carramanhos
        </span>
        <div className="app-footer-links">
          <a
            href="https://www.linkedin.com/in/marcelomsc/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/Marcel-MSC"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
          >
            GitHub
          </a>
        </div>
      </footer>
    </>
  );
}

export default App;
