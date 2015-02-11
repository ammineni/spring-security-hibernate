package com.example.spring.dao;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.spring.model.Book;
import com.example.spring.util.SessionFactoryUtil;

// TODO: Auto-generated Javadoc
/**
 * The Class BookDaoImpl.
 */
@Repository
public class BookDaoImpl implements BookDao {
	
	private static final Logger logger = LoggerFactory.getLogger(BookDaoImpl.class);

	/** The session factory util. */
	@Autowired
	private SessionFactoryUtil sessionFactoryUtil;
		
		
	/* (non-Javadoc)
	 * @see com.example.spring.dao.BookDao#saveBook(com.example.spring.model.Book)
	 */
	public void saveBook(Book book) {
		sessionFactoryUtil.getSession().merge(book);
		logger.info("Book saved successfully, Book Details="+book);

	}

	/* (non-Javadoc)
	 * @see com.example.spring.dao.BookDao#listBooks()
	 */
	@SuppressWarnings("unchecked")
	public List<Book> listBooks() {
		return sessionFactoryUtil.getSession().createCriteria(Book.class).list();
	}

	/* (non-Javadoc)
	 * @see com.example.spring.dao.BookDao#getBook(java.lang.Long)
	 */
	public Book getBook(Long id) {
		return (Book) sessionFactoryUtil.getSession().get(Book.class, id);
	}

	/* (non-Javadoc)
	 * @see com.example.spring.dao.BookDao#deleteBook(java.lang.Long)
	 */
	public void deleteBook(Long id) {

		Book book = getBook(id);
		
		if (book != null) {
			sessionFactoryUtil.getSession().delete(book);
		}
	}

}
