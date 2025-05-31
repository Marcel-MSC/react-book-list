import React from "react";
import BookList from "./components/BookList";

function App() {
    return (
        <main>
            <h1 className="title  text-center w-100 my-4">Search books on Open Library</h1>
            <BookList />
        </main>
    );
}

export default App;