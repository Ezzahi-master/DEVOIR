const Book = require('../models/book.model');
const notificationService = require('./notification.service');

class BookService {
  async getAllBooks() {
    return await Book.find();
  }

  async getBookById(id) {
    return await Book.findById(id);
  }

  async createBook(bookData) {
    const existingBook = await Book.findOne({ isbn: bookData.isbn });
    if (existingBook) {
      throw new Error('Book with this ISBN already exists');
    }
    
    const book = new Book(bookData);
    await book.save();
    
    await notificationService.sendBookCreatedNotification(book);
    
    return book;
  }

  async updateBook(id, bookData) {
    const book = await Book.findByIdAndUpdate(id, bookData, { new: true });
    if (!book) {
      throw new Error('Book not found');
    }
    return book;
  }

  async deleteBook(id) {
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      throw new Error('Book not found');
    }
    return book;
  }
}

module.exports = new BookService();