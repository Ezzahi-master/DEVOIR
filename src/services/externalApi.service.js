const axios = require('axios');

class ExternalApiService {
  async searchBooks(query) {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=5`
      );
      
      return response.data.items.map(item => ({
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors?.join(', '),
        publisher: item.volumeInfo.publisher,
        publishedDate: item.volumeInfo.publishedDate,
        description: item.volumeInfo.description,
        isbn: item.volumeInfo.industryIdentifiers?.[0]?.identifier,
        thumbnail: item.volumeInfo.imageLinks?.thumbnail
      }));
    } catch (error) {
      console.error('Google Books API error:', error.message);
      throw new Error('Failed to fetch books from external API');
    }
  }
}

module.exports = new ExternalApiService();