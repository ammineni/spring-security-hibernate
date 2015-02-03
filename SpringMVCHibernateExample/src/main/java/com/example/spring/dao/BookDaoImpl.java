package com.example.spring.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.spring.model.Book;

@Repository
public class BookDaoImpl implements BookDao {

	@Autowired
	private SessionFactory sessionFactory;
	
	public void saveBook(Book book) {
		getSession().merge(book);

	}

	@SuppressWarnings("unchecked")
	public List<Book> listBooks() {

		return getSession().createCriteria(Book.class).list();
	}

	public Book getBook(Long id) {
		return (Book) getSession().get(Book.class, id);
	}

	public void deleteBook(Long id) {

		Book book = getBook(id);
		
		if (book != null) {
			getSession().delete(book);
		}
	}

	private Session getSession() {
		
		Session session = getSessionFactory().getCurrentSession();
		
		if (session == null) {
			session =  getSessionFactory().openSession();
		}
		
		return session;
	}

	private SessionFactory getSessionFactory() {
		return sessionFactory;
	}
	
}
