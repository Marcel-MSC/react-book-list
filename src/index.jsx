// import React from "react"
// import ReactDom from "react-dom"

// import './index.css'
// import { books } from './components/books'
// import Book from './components/Book'

// function BookList() {
//     return (
//         <section className="booklist">
//             {books.map((book)=>{
//                 return (
//                     <Book key={book.id} {...book}></Book>
//                 )
//             })}
//         </section>
//     );
// }

// ReactDom.render(<BookList />, document.getElementById('root'))

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
