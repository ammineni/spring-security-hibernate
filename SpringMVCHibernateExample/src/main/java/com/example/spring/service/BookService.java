package com.example.spring.service;

import java.util.List;

import com.example.spring.model.Book;


public interface BookService {

	/*
	 * CREATE and UPDATE 
	 */
	public void saveBook(Book book);

	/*
	 * READ
	 */
	public List<Book> listBooks();
	public Book getBook(Long id);

	/*
	 * DELETE
	 */
	public void deleteBook(Long id);

}
