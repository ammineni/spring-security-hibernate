package com.example.spring.service;

import java.util.List;

import com.example.spring.model.Book;


// TODO: Auto-generated Javadoc
/**
 * The Interface BookService.
 */
public interface BookService {

	/*
	 * CREATE and UPDATE 
	 */
	/**
	 * Save book.
	 *
	 * @param book the book
	 */
	public void saveBook(Book book);

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
