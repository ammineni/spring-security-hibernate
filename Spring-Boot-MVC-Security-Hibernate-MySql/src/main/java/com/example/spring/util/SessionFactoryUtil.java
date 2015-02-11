package com.example.spring.util;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

// TODO: Auto-generated Javadoc
/**
 * The Class SessionFactoryUtil.
 */
@Component
public class SessionFactoryUtil {
	
	/** The session factory. */
	@Autowired
	private SessionFactory sessionFactory;

	/**
	 * Gets the session.
	 *
	 * @return the session
	 */
	public Session getSession() {
		
		Session session = getSessionFactory().getCurrentSession();
		
		if (session == null) {
			session =  getSessionFactory().openSession();
		}
		
		return session;
	}

	/**
	 * Gets the session factory.
	 *
	 * @return the session factory
	 */
	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}
	

}
