package com.example.spring.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.spring.model.Book;

// TODO: Auto-generated Javadoc
/**
 * The Class BookDaoImpl.
 */
@Repository
public class BookDaoImpl implements BookDao {

	/** The session factory. */
	@Autowired
	private SessionFactory sessionFactory;
	
	/* (non-Javadoc)
	 * @see com.example.spring.dao.BookDao#saveBook(com.example.spring.model.Book)
	 */
	public void saveBook(Book book) {
		getSession().merge(book);

	}

	/* (non-Javadoc)
	 * @see com.example.spring.dao.BookDao#listBooks()
	 */
	@SuppressWarnings("unchecked")
	public List<Book> listBooks() {

		return getSession().createCriteria(Book.class).list();
	}

	/* (non-Javadoc)
	 * @see com.example.spring.dao.BookDao#getBook(java.lang.Long)
	 */
	public Book getBook(Long id) {
		return (Book) getSession().get(Book.class, id);
	}

	/* (non-Javadoc)
	 * @see com.example.spring.dao.BookDao#deleteBook(java.lang.Long)
	 */
	public void deleteBook(Long id) {

		Book book = getBook(id);
		
		if (book != null) {
			getSession().delete(book);
		}
	}

	/**
	 * Gets the session.
	 *
	 * @return the session
	 */
	private Session getSession() {
		
		Session session = getSessionFactory().getCurrentSession();
		
		if (session == null) {
			session =  getSessionFactory().openSession();
		}
		
		return session;
	}

	/**
	 * Gets the session factory.
	 *
	 * @return the session factory
	 */
	private SessionFactory getSessionFactory() {
		return sessionFactory;
	}
	
}
