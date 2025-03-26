package com.financialapp.demo.service;

import java.util.Calendar;

import org.springframework.stereotype.Service;

import com.financialapp.demo.model.Login;
import com.financialapp.demo.model.Users;
import com.financialapp.demo.model.dto.UsersLoginDTO;
import com.financialapp.demo.repository.UsersRepository;

import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;


@Service
public class UsersService {
    @PersistenceContext
    private EntityManager entityManager;
    
    @Inject
    private UsersRepository repository;
	
    @Transactional
    public void create(UsersLoginDTO userDTO) throws Exception {
    	Users user = new Users();
        user.setCreatedAt(Calendar.getInstance());
        user.setUpdatedAt(Calendar.getInstance());
        user.setStatus(true);
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());
        
        entityManager.persist(user);
    }

    public boolean verifyRegisteredEmail(String email) {
    	Users user = getUserByEmail(email);
        return user != null;
    }
    
    public Users getUserById(Long id) {
    	return repository.getUserByField("id", id);
    }
    
    public Users getUserByEmail(String email) {
        return repository.getUserByField("email", email);
    }
    
    public boolean verifyValidLogin(Login request) {    	
        String email = request.getEmail();

        Users user = repository.getUserByField("email", email);

        if (user == null) {
            return false;
        }

        String storedPassword = user.getPassword();
        String providedPassword = request.getPassword();

        boolean passwordMatch = storedPassword.equals(providedPassword);

        return passwordMatch;
    }
}

	