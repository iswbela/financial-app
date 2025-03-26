package com.financialapp.demo.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.financialapp.demo.model.Users;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Repository
public class UsersRepository {
	@PersistenceContext
    private EntityManager entityManager;
	
	public Users getUserByField(String fieldName, Object value) {
	    String hql = "SELECT u FROM Users u WHERE u." + fieldName + " = :value AND u.deletedAt IS NULL";
	    try {
	        List<Users> results = entityManager.createQuery(hql, Users.class)
	                                           .setParameter("value", value)
	                                           .setMaxResults(1)
	                                           .getResultList();
	        
	        return results.isEmpty() ? null : results.get(0);
	    } catch (Exception e) {
	        return null;
	    }
	}
}