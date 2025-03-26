package com.financialapp.demo.repository;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.financialapp.demo.model.Transactions;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;

@Repository
public class TransactionsRepository {
	@PersistenceContext
    private EntityManager entityManager;
	
	public Double getBalanceByUser(Long userId) {
	    StringBuilder hql = new StringBuilder();
	    hql.append(" SELECT SUM(t.amount) "); 
	    hql.append(" FROM Transactions t ");
	    hql.append(" WHERE t.userId = :userId "); 
	    
	    TypedQuery<Double> query = entityManager.createQuery(hql.toString(), Double.class);
	    query.setParameter("userId", userId);

	    return query.getSingleResult();
	}
	
	public List<Transactions> getTransactionsByUser(Long userId){
		StringBuilder hql = new StringBuilder();
		hql.append(" SELECT t ");
		hql.append(" FROM Transactions t ");
		hql.append(" WHERE userId = :userId ");
		hql.append(" ORDER BY date DESC ");
		
	    TypedQuery<Transactions> query = entityManager.createQuery(hql.toString(), Transactions.class);
	    query.setParameter("userId", userId);

	    return query.getResultList();
	}
}
