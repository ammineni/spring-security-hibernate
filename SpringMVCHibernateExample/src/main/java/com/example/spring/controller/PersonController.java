package com.example.spring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
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
	private PersonService personService;
	
	/**
	 * Sets the person service.
	 *
	 * @param ps the new person service
	 */
	@Autowired(required=true)
	@Qualifier(value="personService")
	public void setPersonService(PersonService ps){
		this.personService = ps;
	}
	
	/**
	 * List persons.
	 *
	 * @param model the model
	 * @return the string
	 */
	@RequestMapping(value = "/persons", method = RequestMethod.GET)
	public String listPersons(Model model) {
		model.addAttribute("person", new Person());
		model.addAttribute("listPersons", this.personService.listPersons());
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
			this.personService.addPerson(p);
		}else{
			//existing person, call update
			this.personService.updatePerson(p);
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
        model.addAttribute("person", this.personService.getPersonById(id));
        model.addAttribute("listPersons", this.personService.listPersons());
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
		
        this.personService.removePerson(id);
        return "redirect:/persons";
    }
 
    
	
}
