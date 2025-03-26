package com.financialapp.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.financialapp.demo.model.Login;
import com.financialapp.demo.model.Users;
import com.financialapp.demo.model.dto.UsersDTO;
import com.financialapp.demo.service.UsersService;

@RestController
public class LoginController {

    private final UsersService userService; 

    public LoginController(UsersService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody Login request) {
        boolean isValidLogin = userService.verifyValidLogin(request);
        Users user = userService.getUserByEmail(request.getEmail());

        if (isValidLogin) {
            UsersDTO userDTO = new UsersDTO(user);
            return ResponseEntity.ok(new LoginResponse(userDTO));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                new LoginResponse("Invalid email or password")
            );
        }
    }

    static class LoginResponse {
        private String message;
        private UsersDTO user;

        public LoginResponse(String message) {
            this.message = message;
        }

        public LoginResponse(UsersDTO userDTO) {
            this.message = "Login successful";
            this.user = userDTO;
        }

        public String getMessage() {
            return message;
        }

        public UsersDTO getUser() {
            return user;
        }
    }

}