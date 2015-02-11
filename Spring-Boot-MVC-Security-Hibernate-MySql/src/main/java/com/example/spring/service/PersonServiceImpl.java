package com.example.spring.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
	@Autowired
	private PersonDAO personDAO;

	
	/* (non-Javadoc)
	 * @see com.example.spring.service.PersonService#addPerson(com.example.spring.model.Person)
	 */
	@Override
	@Transactional
	public void addPerson(Person p) {
		personDAO.addPerson(p);
	}

	/* (non-Javadoc)
	 * @see com.example.spring.service.PersonService#updatePerson(com.example.spring.model.Person)
	 */
	@Override
	@Transactional
	public void updatePerson(Person p) {
		personDAO.updatePerson(p);
	}

	/* (non-Javadoc)
	 * @see com.example.spring.service.PersonService#listPersons()
	 */
	@Override
	@Transactional
	public List<Person> listPersons() {
		return personDAO.listPersons();
	}

	/* (non-Javadoc)
	 * @see com.example.spring.service.PersonService#getPersonById(int)
	 */
	@Override
	@Transactional
	public Person getPersonById(int id) {
		return personDAO.getPersonById(id);
	}

	/* (non-Javadoc)
	 * @see com.example.spring.service.PersonService#removePerson(int)
	 */
	@Override
	@Transactional
	public void removePerson(int id) {
		personDAO.removePerson(id);
	}

}
