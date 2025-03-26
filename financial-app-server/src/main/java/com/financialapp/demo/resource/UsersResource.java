package com.financialapp.demo.resource;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.financialapp.demo.model.Users;
import com.financialapp.demo.model.dto.UsersLoginDTO;
import com.financialapp.demo.service.UsersService;

import jakarta.inject.Inject;

@RestController
@RequestMapping("/users")
public class UsersResource {
	
	@Inject
	UsersService service;
  
	@PostMapping("/create")
	public ResponseEntity<String> create(@RequestBody UsersLoginDTO user) {
	    if (service.verifyRegisteredEmail(user.getEmail())) {
	        return new ResponseEntity<>("Email already registered", HttpStatus.BAD_REQUEST);
	    }
	    try {
	        service.create(user);
	        return ResponseEntity.status(HttpStatus.CREATED).body("{\"message\": \"User created successfully\"}");
	    } catch (Exception e) {
	        return new ResponseEntity<>("An error occurred during registration", HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
	
	@GetMapping("/getUserById")
	public ResponseEntity<?> getUserById(@RequestParam Long userId) {
	    try {
	        Users user = service.getUserById(userId);
	        if (user == null) {
	            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
	        }
	        return new ResponseEntity<>(user, HttpStatus.OK);
	    } catch (Exception e) {
	        return new ResponseEntity<>("An error occurred while retrieving the user", HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
}
