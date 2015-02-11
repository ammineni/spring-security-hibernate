package com.example.spring.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

// TODO: Auto-generated Javadoc
/**
 * The Class Book.
 */
@Entity
@Table(name = "book")
public class Book {

	/** The id. */
	private Long id;
	
	/** The name. */
	private String name;
	
	/** The code. */
	private String code;
	
	/** The price. */
	private String price;
	
	/** The authors. */
	private String authors;
	
	/** The isbn. */
	private String isbn;
	
	/** The publisher. */
	private String publisher;
	
	/** The published on. */
	private Date publishedOn;

	/**
	 * Gets the id.
	 *
	 * @return the id
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public Long getId() {
		return id;
	}

	/**
	 * Gets the name.
	 *
	 * @return the name
	 */
	@Column(nullable = false)
	public String getName() {
		return name;
	}

	/**
	 * Gets the code.
	 *
	 * @return the code
	 */
	@Column(length = 15, nullable = false)
	public String getCode() {
		return code;
	}

	/**
	 * Gets the price.
	 *
	 * @return the price
	 */
	@Column(length = 10)
	public String getPrice() {
		return price;
	}

	/**
	 * Gets the authors.
	 *
	 * @return the authors
	 */
	@Column(nullable = false)
	public String getAuthors() {
		return authors;
	}

	/**
	 * Gets the isbn.
	 *
	 * @return the isbn
	 */
	@Column
	public String getIsbn() {
		return isbn;
	}

	/**
	 * Gets the publisher.
	 *
	 * @return the publisher
	 */
	@Column
	public String getPublisher() {
		return publisher;
	}

	/**
	 * Gets the published on.
	 *
	 * @return the published on
	 */
	@Column(name = "published_date")
	public Date getPublishedOn() {
		return publishedOn;
	}

	/**
	 * Sets the id.
	 *
	 * @param id the new id
	 */
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * Sets the name.
	 *
	 * @param name the new name
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * Sets the code.
	 *
	 * @param code the new code
	 */
	public void setCode(String code) {
		this.code = code;
	}

	/**
	 * Sets the price.
	 *
	 * @param price the new price
	 */
	public void setPrice(String price) {
		this.price = price;
	}

	/**
	 * Sets the authors.
	 *
	 * @param authors the new authors
	 */
	public void setAuthors(String authors) {
		this.authors = authors;
	}

	/**
	 * Sets the isbn.
	 *
	 * @param isbn the new isbn
	 */
	public void setIsbn(String isbn) {
		this.isbn = isbn;
	}

	/**
	 * Sets the publisher.
	 *
	 * @param publisher the new publisher
	 */
	public void setPublisher(String publisher) {
		this.publisher = publisher;
	}

	/**
	 * Sets the published on.
	 *
	 * @param publishedOn the new published on
	 */
	public void setPublishedOn(Date publishedOn) {
		this.publishedOn = publishedOn;
	}

}
