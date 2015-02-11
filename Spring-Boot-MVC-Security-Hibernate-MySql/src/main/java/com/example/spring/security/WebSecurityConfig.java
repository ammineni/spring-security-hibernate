package com.example.spring.security;

import javax.servlet.http.HttpServletRequest;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.servlet.configuration.EnableWebMvcSecurity;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RegexRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;

@Configuration
@EnableWebMvcSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	private DataSource dataSource;
   	
	@Override
	  protected void configure(HttpSecurity http) throws Exception {

	    // Build the request matcher for CSFR
	    RequestMatcher csrfRequestMatcher = new RequestMatcher() {

	      private RegexRequestMatcher requestMatcher =
	          new RegexRequestMatcher("/urls-with-csrf-check/*", null);

	      @Override
	      public boolean matches(HttpServletRequest request) {

	          // Enable the CSRF
	          if(requestMatcher.matches(request))
	              return true;
	              
	          // You can add here any other rule on the request object, returning 
	          // true if the CSRF must be enabled, false otherwise
	          // ....

	          // No CSRF for other requests
	          return false;
	      }
		
	    }; // new RequestMatcher

	    http
	      // Enable csrf only on some request matches
	      .csrf()
	        .requireCsrfProtectionMatcher(csrfRequestMatcher)
	        .and()
	      // Other security configurations ...
	      .authorizeRequests()
	        .antMatchers(
	            "/",
	            "/login",
	            "/user/**"
	            )
	            .permitAll()
	        .anyRequest().authenticated()
	        .and()
	      .formLogin().failureUrl("/login?error")
	        .loginPage("/login")
	        .permitAll()
	        .and()
	      .logout()
	        .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
	        .logoutSuccessUrl("/login?logout")
	        .permitAll();
	    
	    //http.exceptionHandling().accessDeniedPage("/403page");
	    http.formLogin().failureUrl("/login?denied");
	    
	    return;
	  } // method configure
	
    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        //auth.inMemoryAuthentication().withUser("user").password("password").roles("USER");
    	auth.jdbcAuthentication().dataSource(dataSource).usersByUsernameQuery("select username,password, enabled from users where username=?");
    	auth.jdbcAuthentication().dataSource(dataSource).authoritiesByUsernameQuery("select username, role from authorities where username =?");
    	
    }
}