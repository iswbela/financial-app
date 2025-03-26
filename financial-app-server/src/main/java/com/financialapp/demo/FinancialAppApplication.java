package com.financialapp.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.financialapp.demo", "com.financialapp.config"})
public class FinancialAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(FinancialAppApplication.class, args);
	}

}
