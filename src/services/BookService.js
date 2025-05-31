class BookService {
  static async fetchBooks(query) {
    // Codifica o termo de busca para uso seguro na URL
    const search = encodeURIComponent(query);
    const response = await fetch(`https://openlibrary.org/search.json?title=${search}`);
    return response.json();
  }
}

export default BookService;