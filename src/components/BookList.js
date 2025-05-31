import React, { useEffect, useState } from "react";
import BookService from "../services/BookService";
import Book from "./Book";

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [query, setQuery] = useState("the lord of the rings");

    useEffect(() => {
        if (query) {
            BookService.fetchBooks(query).then(data => {
                setBooks(data.docs || []);
            });
        }
    }, [query]);

    const handleSearch = (e) => {
        e.preventDefault();
        const value = e.target.elements.search.value;
        setQuery(value);
    };

    return (
        <section>
            <div className="container d-flex flex-column align-items-center my-4">
                <h2 className="buscarTitle mb-4 text-center w-100" style={{ display: "flex", justifyContent: "center" }}>
                    Search Books
                </h2>
                <form
                    onSubmit={handleSearch}
                    className="d-flex justify-content-center align-items-center"
                    style={{ maxWidth: 600, width: "100%" }}
                >
                    <input
                        type="text"
                        name="search"
                        className="form-control me-2"
                        placeholder="Buscar livro..."
                        defaultValue={query}
                    />
                    <button type="submit" className="btn btn-primary">
                        Buscar
                    </button>
                </form>
            </div>
            <div className="booklist">
                {books.map((book) => (
                    <Book
                        key={book.key} 
                        title={book.title} 
                        author={book.author_name?.[0]} 
                        cover_i={book.cover_i }
                    />
                ))}
            </div>
        </section>
    );
};

export default BookList;