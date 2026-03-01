import React, { useState } from "react";

const BOOK_COVER_STYLE = {
  width: "150px",
  height: "220px",
  objectFit: "cover",
  borderRadius: "8px",
};

function StarIcon({ filled }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      aria-hidden
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

const Book = ({ book, currentRating = 0, onRate, variant = "card" }) => {
  const [imageError, setImageError] = useState(false);
  const title = book?.title ?? "";
  const author = Array.isArray(book?.author_name)
    ? book.author_name[0]
    : book?.author_name;
  const cover_i = book?.cover_i;
  const hasCover = cover_i != null && cover_i !== undefined && !imageError;
  const imageUrl = `https://covers.openlibrary.org/b/id/${cover_i}-L.jpg`;
  const thumbUrl =
    cover_i != null ? `https://covers.openlibrary.org/b/id/${cover_i}-S.jpg` : null;

  const handleStarClick = (value) => {
    const next = currentRating === value ? 0 : value;
    onRate(book, next);
  };

  const starRating = (
    <div className="book-star-rating" role="group" aria-label="Rate 1 to 5 stars">
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          type="button"
          className={`book-star-btn ${currentRating >= value ? "is-filled" : ""}`}
          onClick={() => handleStarClick(value)}
          aria-label={`${value} star${value > 1 ? "s" : ""}`}
          title={`Rate ${value} star${value > 1 ? "s" : ""}. Click again to remove.`}
        >
          <StarIcon filled={currentRating >= value} />
        </button>
      ))}
    </div>
  );

  if (variant === "table") {
    return (
      <tr>
        <td data-label="Cover">
          {hasCover && thumbUrl ? (
            <img
              src={thumbUrl}
              alt=""
              className="book-table-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="book-table-cover-placeholder">No cover</div>
          )}
        </td>
        <td data-label="Title">{title}</td>
        <td data-label="Author">{author ?? "—"}</td>
        <td data-label="Rating">{starRating}</td>
      </tr>
    );
  }

  return (
    <article className="book d-flex flex-column align-items-center">
      <div className="book-cover-wrapper" style={{ width: 150, height: 220 }}>
        {hasCover ? (
          <img
            src={imageUrl}
            alt={`Cover: ${title}`}
            style={BOOK_COVER_STYLE}
            onError={() => setImageError(true)}
          />
        ) : (
          <div
            className="book-cover-placeholder"
            role="img"
            aria-label="Cover not available"
          >
            <span className="book-cover-placeholder-text">
              Could not load cover
            </span>
          </div>
        )}
      </div>
      <h1 className="mt-3">{title}</h1>
      <h4>{author}</h4>
      {starRating}
    </article>
  );
};

export default Book;
