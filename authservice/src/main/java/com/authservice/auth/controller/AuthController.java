package com.authservice.auth.controller;

import com.authservice.auth.model.User;
import com.authservice.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

/**
 * The AuthController class handles the authentication and authorization endpoints for the application.
 * It provides methods for user registration, user login, user logout, and other authentication-related operations.
 */
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            return ResponseEntity.badRequest().body("User already exists - please log in");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody User user) {
        User existingUser = userRepository.findByUsername(user.getUsername());

        if (existingUser != null && passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
            return ResponseEntity.ok("User authenticated");
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser() {
        // This endpoint might be handled differently depending on your session management strategy
        return ResponseEntity.ok("User logged out successfully.");
    }

    @PostMapping("/signup-with-google")
    public ResponseEntity<?> signupWithGoogle(@RequestParam String googleAccessToken) {
        // This method assumes that Google sign-up/authentication logic is handled elsewhere
        return ResponseEntity.status(501).body("Google sign-up not implemented.");
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestParam String username) {
        User user = userRepository.findByUsername(username);

        if (user == null) {
            return ResponseEntity.badRequest().body("Error: User not found.");
        }

        // Generate reset password token
        String resetToken = UUID.randomUUID().toString();

        // Send reset password link to user's email address
        sendResetPasswordEmail(user.getUsername(), resetToken);

        return ResponseEntity.ok("Reset password link sent to your email.");
    }

    private void sendResetPasswordEmail(String email, String resetToken) {
        // Code to send reset password email
        System.out.println("Sending reset password email to: " + email + " with token: " + resetToken);
    }
}
