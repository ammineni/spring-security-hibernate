package com.example.spring.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.spring.dao.BookDao;
import com.example.spring.model.Book;

@Service
public class BookServiceImpl implements BookService {

	@Autowired
	private BookDao bookDao;

	@Transactional
	public void saveBook(Book book) {
		bookDao.saveBook(book);
	}

	@Transactional(readOnly = true)
	public List<Book> listBooks() {
		return bookDao.listBooks();
	}

	@Transactional(readOnly = true)
	public Book getBook(Long id) {
		return bookDao.getBook(id);
	}

	@Transactional
	public void deleteBook(Long id) {
		bookDao.deleteBook(id);

	}

}
