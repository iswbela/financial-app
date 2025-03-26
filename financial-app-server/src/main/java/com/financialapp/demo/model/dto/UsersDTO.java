package com.financialapp.demo.model.dto;

import com.financialapp.demo.model.Users;

public class UsersDTO {
    private Long id;
	private String email;
    private String name;

    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

    public UsersDTO(Users user) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.name = user.getName();
    }
}
