package com.example.spring.configs;

import java.util.Properties;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.hibernate4.HibernateTransactionManager;
import org.springframework.orm.hibernate4.LocalSessionFactoryBean;
import org.springframework.transaction.annotation.EnableTransactionManagement;

// TODO: Auto-generated Javadoc
/**
 * The Class DatabaseConfig.
 */
@Configuration
@EnableTransactionManagement
public class DatabaseConfig {

  /** The db driver. */
  @Value("${db.driver}")
  private String DB_DRIVER;
  
  /** The db password. */
  @Value("${db.password}")
  private String DB_PASSWORD;
  
  /** The db url. */
  @Value("${db.url}")
  private String DB_URL;
  
  /** The db username. */
  @Value("${db.username}")
  private String DB_USERNAME;

  /** The hibernate dialect. */
  @Value("${hibernate.dialect}")
  private String HIBERNATE_DIALECT;
  
  /** The hibernate show sql. */
  @Value("${hibernate.show_sql}")
  private String HIBERNATE_SHOW_SQL;
  
  /** The HIBERNAT e_ hb m2 dd l_ auto. */
  @Value("${hibernate.hbm2ddl.auto}")
  private String HIBERNATE_HBM2DDL_AUTO;

  /** The entitymanager packages to scan. */
  @Value("${entitymanager.packagesToScan}")
  private String ENTITYMANAGER_PACKAGES_TO_SCAN;
  
  /**
   * Data source.
   *
   * @return the data source
   */
  @Bean
  public DataSource dataSource() {
    DriverManagerDataSource dataSource = new DriverManagerDataSource();
    dataSource.setDriverClassName(DB_DRIVER);
    dataSource.setUrl(DB_URL);
    dataSource.setUsername(DB_USERNAME);
    dataSource.setPassword(DB_PASSWORD);
    return dataSource;
  }

  /**
   * Session factory.
   *
   * @return the local session factory bean
   */
  @Bean
  public LocalSessionFactoryBean sessionFactory() {
    LocalSessionFactoryBean sessionFactoryBean = new LocalSessionFactoryBean();
    sessionFactoryBean.setDataSource(dataSource());
    sessionFactoryBean.setPackagesToScan(ENTITYMANAGER_PACKAGES_TO_SCAN);
    Properties hibernateProperties = new Properties();
    hibernateProperties.put("hibernate.dialect", HIBERNATE_DIALECT);
    hibernateProperties.put("hibernate.show_sql", HIBERNATE_SHOW_SQL);
    hibernateProperties.put("hibernate.hbm2ddl.auto", HIBERNATE_HBM2DDL_AUTO);
    sessionFactoryBean.setHibernateProperties(hibernateProperties);
    
    return sessionFactoryBean;
  }

  /**
   * Transaction manager.
   *
   * @return the hibernate transaction manager
   */
  @Bean
  public HibernateTransactionManager transactionManager() {
    HibernateTransactionManager transactionManager = 
        new HibernateTransactionManager();
    transactionManager.setSessionFactory(sessionFactory().getObject());
    return transactionManager;
  }

} // class DatabaseConfig
