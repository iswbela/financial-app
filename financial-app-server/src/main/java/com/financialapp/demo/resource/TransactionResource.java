package com.financialapp.demo.resource;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.financialapp.demo.model.Transactions;
import com.financialapp.demo.service.TransactionService;

import jakarta.inject.Inject;

@RestController
@RequestMapping("/transaction")
public class TransactionResource {
	@Inject
	TransactionService service;
	
	@PostMapping("/create")
	public ResponseEntity<String> create(@RequestBody Transactions transaction) {
	    try {
	        service.create(transaction);
	        return ResponseEntity.status(HttpStatus.CREATED).body("{\"message\": \"Transaction created successfully\"}");
	    } catch (Exception e) {
	        return new ResponseEntity<>("An error occurred during registration of transaction", HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
	
	@GetMapping("/getBalanceByUser")
	public ResponseEntity<?> getBalanceByUser(@RequestParam Long userId) {
	    try {
	        Double value = service.getBalanceByUser(userId);
	        return ResponseEntity.ok(value);
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	            .body("An error occurred while retrieving the balance: " + e.getMessage());
	    }
	}
	
	@GetMapping("/getTransactionsByUser")
	public ResponseEntity<?> getTransactionsByUser(@RequestParam Long userId) {
	    try {
	    	List<Transactions> transactions = service.getTransactionsByUser(userId);
	        return ResponseEntity.ok(transactions);
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	            .body("An error occurred while retrieving the balance: " + e.getMessage());
	    }
	}

}
