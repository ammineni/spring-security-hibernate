package com.example.spring.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.example.spring.model.Book;
import com.example.spring.service.BookService;

// TODO: Auto-generated Javadoc
/**
 * The Class BookController.
 */
@Controller
//@RequestMapping("/book")
public class BookController {

	/** The book service. */
	@Autowired
	private BookService bookService;

	
	//@RequestMapping(value = "/listBooks", method = RequestMethod.GET)
	/**
	 * List books.
	 *
	 * @param map the map
	 * @return the string
	 */
	//@RequestMapping(value = { "/", "/listBooks" })
	@RequestMapping("/listBooks")
	public String listBooks(Map<String, Object> map) {
		map.put("book", new Book());
		map.put("bookList", bookService.listBooks());

		return "/book/listBooks";
	}

	/**
	 * Gets the book.
	 *
	 * @param bookId the book id
	 * @param map the map
	 * @return the book
	 */
	@RequestMapping("/get/{bookId}")
	public String getBook(@PathVariable Long bookId, Map<String, Object> map) {

		Book book = bookService.getBook(bookId);

		map.put("book", book);

		return "/book/bookForm";
	}

	/**
	 * Save book.
	 *
	 * @param book the book
	 * @param result the result
	 * @return the string
	 */
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public String saveBook(@ModelAttribute("book") Book book,
			BindingResult result) {
		bookService.saveBook(book);

		/*
		 * Note that there is no slash "/" right after "redirect:" So, it
		 * redirects to the path relative to the current path
		 */
		return "redirect:listBooks";
	}

	/**
	 * Delete book.
	 *
	 * @param id the id
	 * @return the string
	 */
	@RequestMapping("/delete/{bookId}")
	public String deleteBook(@PathVariable("bookId") Long id) {

		bookService.deleteBook(id);

		/*
		 * redirects to the path relative to the current path
		 */
		// return "redirect:../listBooks";

		/*
		 * Note that there is the slash "/" right after "redirect:" So, it
		 * redirects to the path relative to the project root path
		 */
		return "redirect:/listBooks";
	}
}
