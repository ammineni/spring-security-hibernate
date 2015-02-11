package com.example.spring.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.spring.dao.UserDao;
import com.example.spring.dao.UserDaoImpls;

/**
 * A class to test the interaction with MySQL database using the UserDaoImpls class.
 *
 * @author netgloo
 */
@Controller
public class UserController {

  // ==============
  // PRIVATE FIELDS
  // ==============

  @Autowired
  private UserDaoImpls _userDao;
  
  // ==============
  // PUBLIC METHODS
  // ==============
  
  /**
   * Create a new user and save it in the database.
   * 
   * @param email user email
   * @param name use name
   * @return a string describing if the user is succesfully created or not.
   */
  @RequestMapping("/create")
  @ResponseBody
  public String create(String email, String name) {
    try {
      UserDao user = new UserDao(email, name);
      _userDao.save(user);
    }
    catch (Exception ex) {
      return "Error creating the user: " + ex.toString();
    }
    return "UserDao succesfully created!";
  }
  
  /**
   * Delete the user having the passed id.
   * 
   * @param id the id of the user to delete
   * @return a string describing if the user is succesfully deleted or not.
   */
  @RequestMapping("/delete")
  @ResponseBody
  public String delete(long id) {
    try {
      UserDao user = new UserDao(id);
      _userDao.delete(user);
    }
    catch (Exception ex) {
      return "Error deleting the user:" + ex.toString();
    }
    return "UserDao succesfully deleted!";
  }
  
  /**
   * Return the id for the user having the passed email.
   * 
   * @param email the email to search in the database.
   * @return the user id or a message error if the user is not found.
   */
  @RequestMapping("/get-by-email")
  @ResponseBody
  public String getByEmail(String email) {
    String userId;
    try {
      UserDao user = _userDao.findByEmail(email);
      userId = String.valueOf(user.getId());
    }
    catch (Exception ex) {
      return "UserDao not found";
    }
    return "The user id is: " + userId;
  }
  
  /**
   * Update the email and the name for the user in the database having the
   * passed id.
   * 
   * @param id the id for the user to update.
   * @param email the new email.
   * @param name the new name.
   * @return a string describing if the user is succesfully updated or not.
   */
  @RequestMapping("/update")
  @ResponseBody
  public String updateUser(long id, String email, String name) {
    try {
      UserDao user = _userDao.findOne(id);
      user.setEmail(email);
      user.setName(name);
      _userDao.save(user);
    }
    catch (Exception ex) {
      return "Error updating the user: " + ex.toString();
    }
    return "UserDao succesfully updated!";
  }

} // class UserController
