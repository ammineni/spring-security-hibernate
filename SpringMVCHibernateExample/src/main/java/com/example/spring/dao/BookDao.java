package com.example.spring.dao;

import java.util.List;

import com.example.spring.model.Book;

// TODO: Auto-generated Javadoc
/**
 * The Interface BookDao.
 */
public interface BookDao {

	/*
	 * CREATE and UPDATE
	 */
	/**
	 * Save book.
	 *
	 * @param book the book
	 */
	public void saveBook(Book book); // create and update

	/*
	 * READ
	 */
	/**
	 * List books.
	 *
	 * @return the list
	 */
	public List<Book> listBooks();
	
	/**
	 * Gets the book.
	 *
	 * @param id the id
	 * @return the book
	 */
	public Book getBook(Long id);

	/*
	 * DELETE
	 */
	/**
	 * Delete book.
	 *
	 * @param id the id
	 */
	public void deleteBook(Long id);
}
