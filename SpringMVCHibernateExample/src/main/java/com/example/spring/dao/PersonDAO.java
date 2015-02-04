package com.example.spring.dao;

import java.util.List;

import com.example.spring.model.Person;

// TODO: Auto-generated Javadoc
/**
 * The Interface PersonDAO.
 */
public interface PersonDAO {

	/**
	 * Adds the person.
	 *
	 * @param p the p
	 */
	public void addPerson(Person p);
	
	/**
	 * Update person.
	 *
	 * @param p the p
	 */
	public void updatePerson(Person p);
	
	/**
	 * List persons.
	 *
	 * @return the list
	 */
	public List<Person> listPersons();
	
	/**
	 * Gets the person by id.
	 *
	 * @param id the id
	 * @return the person by id
	 */
	public Person getPersonById(int id);
	
	/**
	 * Removes the person.
	 *
	 * @param id the id
	 */
	public void removePerson(int id);
}
