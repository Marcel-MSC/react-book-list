class BookService {
  static async fetchBooks(query, { limit = 20, offset = 0 } = {}) {
    const search = encodeURIComponent(query);
    const response = await fetch(
      `https://openlibrary.org/search.json?title=${search}&limit=${limit}&offset=${offset}`
    );
    return response.json();
  }
}

export default BookService;