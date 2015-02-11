package com.example.spring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.example.spring.model.Person;
import com.example.spring.service.PersonService;

// TODO: Auto-generated Javadoc
/**
 * The Class PersonController.
 */
@Controller
public class PersonController {
	
	/** The person service. */
	@Autowired 
	private PersonService personService;
	
	
	/**
	 * List persons.
	 *
	 * @param model the model
	 * @return the string
	 */
	@RequestMapping(value = "/persons", method = RequestMethod.GET)
	public String listPersons(Model model) {
		model.addAttribute("person", new Person());
		model.addAttribute("listPersons", personService.listPersons());
		return "person";
	}
	
	//For add and update person both
	/**
	 * Adds the person.
	 *
	 * @param p the p
	 * @return the string
	 */
	@RequestMapping(value= "/person/add", method = RequestMethod.POST)
	public String addPerson(@ModelAttribute("person") Person p){
		
		if(p.getId() == 0){
			//new person, add it
			personService.addPerson(p);
		}else{
			//existing person, call update
			personService.updatePerson(p);
		}
		
		return "redirect:/persons";
		
	}
	
	/**
	 * Edits the person.
	 *
	 * @param id the id
	 * @param model the model
	 * @return the string
	 */
	@RequestMapping("/edit/{id}")
    public String editPerson(@PathVariable("id") int id, Model model){
        model.addAttribute("person", personService.getPersonById(id));
        model.addAttribute("listPersons", personService.listPersons());
        return "person";
    }
	
	/**
	 * Removes the person.
	 *
	 * @param id the id
	 * @return the string
	 */
	@RequestMapping("/remove/{id}")
    public String removePerson(@PathVariable("id") int id){
		
        personService.removePerson(id);
        return "redirect:/persons";
    }
 
    
	
}
