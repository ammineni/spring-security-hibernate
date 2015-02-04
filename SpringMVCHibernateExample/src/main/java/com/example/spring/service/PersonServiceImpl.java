package com.example.spring.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.spring.dao.PersonDAO;
import com.example.spring.model.Person;

// TODO: Auto-generated Javadoc
/**
 * The Class PersonServiceImpl.
 */
@Service
public class PersonServiceImpl implements PersonService {
	
	/** The person dao. */
	private PersonDAO personDAO;

	/**
	 * Sets the person dao.
	 *
	 * @param personDAO the new person dao
	 */
	public void setPersonDAO(PersonDAO personDAO) {
		this.personDAO = personDAO;
	}

	/* (non-Javadoc)
	 * @see com.example.spring.service.PersonService#addPerson(com.example.spring.model.Person)
	 */
	@Override
	@Transactional
	public void addPerson(Person p) {
		this.personDAO.addPerson(p);
	}

	/* (non-Javadoc)
	 * @see com.example.spring.service.PersonService#updatePerson(com.example.spring.model.Person)
	 */
	@Override
	@Transactional
	public void updatePerson(Person p) {
		this.personDAO.updatePerson(p);
	}

	/* (non-Javadoc)
	 * @see com.example.spring.service.PersonService#listPersons()
	 */
	@Override
	@Transactional
	public List<Person> listPersons() {
		return this.personDAO.listPersons();
	}

	/* (non-Javadoc)
	 * @see com.example.spring.service.PersonService#getPersonById(int)
	 */
	@Override
	@Transactional
	public Person getPersonById(int id) {
		return this.personDAO.getPersonById(id);
	}

	/* (non-Javadoc)
	 * @see com.example.spring.service.PersonService#removePerson(int)
	 */
	@Override
	@Transactional
	public void removePerson(int id) {
		this.personDAO.removePerson(id);
	}

}
