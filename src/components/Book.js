import React from "react";

const Book = ({ title, author, cover_i }) => {

  const imageUrl = `https://covers.openlibrary.org/b/id/${cover_i}-L.jpg`;

  return (
    <article className="book d-flex flex-column align-items-center">
      <img
        src={imageUrl}
        alt={`Capa do livro ${title}`}
        style={{ width: "150px", height: "220px", objectFit: "cover", borderRadius: "8px" }}
      />
      <h1 className="mt-3">{title}</h1>
      <h4>{author}</h4>
    </article>
  );
};

export default Book;