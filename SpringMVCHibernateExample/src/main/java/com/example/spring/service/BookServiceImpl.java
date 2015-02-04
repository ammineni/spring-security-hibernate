package com.example.spring.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.spring.dao.BookDao;
import com.example.spring.model.Book;

// TODO: Auto-generated Javadoc
/**
 * The Class BookServiceImpl.
 */
@Service
public class BookServiceImpl implements BookService {

	/** The book dao. */
	@Autowired
	private BookDao bookDao;

	/* (non-Javadoc)
	 * @see com.example.spring.service.BookService#saveBook(com.example.spring.model.Book)
	 */
	@Transactional
	public void saveBook(Book book) {
		bookDao.saveBook(book);
	}

	/* (non-Javadoc)
	 * @see com.example.spring.service.BookService#listBooks()
	 */
	@Transactional(readOnly = true)
	public List<Book> listBooks() {
		return bookDao.listBooks();
	}

	/* (non-Javadoc)
	 * @see com.example.spring.service.BookService#getBook(java.lang.Long)
	 */
	@Transactional(readOnly = true)
	public Book getBook(Long id) {
		return bookDao.getBook(id);
	}

	/* (non-Javadoc)
	 * @see com.example.spring.service.BookService#deleteBook(java.lang.Long)
	 */
	@Transactional
	public void deleteBook(Long id) {
		bookDao.deleteBook(id);

	}

}
