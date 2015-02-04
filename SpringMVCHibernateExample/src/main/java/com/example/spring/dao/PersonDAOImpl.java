package com.example.spring.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.example.spring.model.Person;

// TODO: Auto-generated Javadoc
/**
 * The Class PersonDAOImpl.
 */
@Repository
public class PersonDAOImpl implements PersonDAO {
	
	/** The Constant logger. */
	private static final Logger logger = LoggerFactory.getLogger(PersonDAOImpl.class);

	/** The session factory. */
	private SessionFactory sessionFactory;
	
	/**
	 * Sets the session factory.
	 *
	 * @param sf the new session factory
	 */
	public void setSessionFactory(SessionFactory sf){
		this.sessionFactory = sf;
	}

	/* (non-Javadoc)
	 * @see com.example.spring.dao.PersonDAO#addPerson(com.example.spring.model.Person)
	 */
	@Override
	public void addPerson(Person p) {
		Session session = this.sessionFactory.getCurrentSession();
		session.persist(p);
		logger.info("Person saved successfully, Person Details="+p);
	}

	/* (non-Javadoc)
	 * @see com.example.spring.dao.PersonDAO#updatePerson(com.example.spring.model.Person)
	 */
	@Override
	public void updatePerson(Person p) {
		Session session = this.sessionFactory.getCurrentSession();
		session.update(p);
		logger.info("Person updated successfully, Person Details="+p);
	}

	/* (non-Javadoc)
	 * @see com.example.spring.dao.PersonDAO#listPersons()
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<Person> listPersons() {
		Session session = this.sessionFactory.getCurrentSession();
		List<Person> personsList = session.createQuery("from Person").list();
		for(Person p : personsList){
			logger.info("Person List::"+p);
		}
		return personsList;
	}

	/* (non-Javadoc)
	 * @see com.example.spring.dao.PersonDAO#getPersonById(int)
	 */
	@Override
	public Person getPersonById(int id) {
		Session session = this.sessionFactory.getCurrentSession();		
		Person p = (Person) session.load(Person.class, new Integer(id));
		logger.info("Person loaded successfully, Person details="+p);
		return p;
	}

	/* (non-Javadoc)
	 * @see com.example.spring.dao.PersonDAO#removePerson(int)
	 */
	@Override
	public void removePerson(int id) {
		Session session = this.sessionFactory.getCurrentSession();
		Person p = (Person) session.load(Person.class, new Integer(id));
		if(null != p){
			session.delete(p);
		}
		logger.info("Person deleted successfully, person details="+p);
	}

}
