package com.authservice.auth.controller;

import com.authservice.auth.model.User;

public interface AuthService {
    String registerUser(User user) throws Exception;
    String authenticateUser(String username, String password) throws Exception;
}
