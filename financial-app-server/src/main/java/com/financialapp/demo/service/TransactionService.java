package com.financialapp.demo.service;

import java.util.Calendar;
import java.util.List;

import org.springframework.stereotype.Service;

import com.financialapp.demo.model.Transactions;
import com.financialapp.demo.repository.TransactionsRepository;

import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Service
public class TransactionService {
    
	@PersistenceContext
    private EntityManager entityManager;
	
	@Inject
	private TransactionsRepository repository;
    
    @Transactional
    public void create(Transactions transaction) throws Exception {
    	transaction.setDate(Calendar.getInstance());
        entityManager.persist(transaction);
    }
    
	public Double getBalanceByUser(Long userId) {
		return repository.getBalanceByUser(userId);
	}
	
	public List<Transactions> getTransactionsByUser(Long userId){
		return repository.getTransactionsByUser(userId);
	}
}
