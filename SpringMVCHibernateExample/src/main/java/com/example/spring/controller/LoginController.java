package com.example.spring.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

// TODO: Auto-generated Javadoc
/**
 * The Class LoginController.
 */
@Controller
public class LoginController {

	/**
	 * Gets the login form.
	 *
	 * @param authfailed the authfailed
	 * @param logout the logout
	 * @param denied the denied
	 * @return the login form
	 */
	@RequestMapping("login")
	public ModelAndView getLoginForm(@RequestParam(required = false) String authfailed, String logout, String denied) {
		String message = "";
		if (authfailed != null) {
			message = "Invalid username of password, try again !";
		} else if (logout != null) {
			message = "Logged Out successfully, login again to continue !";
		} else if (denied != null) {
			message = "Access denied for this user !";
		}
		return new ModelAndView("login", "message", message);
	}
		
	/**
	 * Ge user page.
	 *
	 * @return the string
	 */
	@RequestMapping("user")
	public String geUserPage() {
		return "user";
	}
	
	/**
	 * Ge admin page.
	 *
	 * @return the string
	 */
	@RequestMapping("admin")
	public String geAdminPage() {
		return "admin";
	}

	/**
	 * Ge403denied.
	 *
	 * @return the string
	 */
	@RequestMapping("403page")
	public String ge403denied() {
		return "redirect:login?denied";
	}
}