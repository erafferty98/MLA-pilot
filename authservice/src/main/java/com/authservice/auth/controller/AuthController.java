package com.authservice.auth.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.authservice.auth.model.User;
import com.authservice.auth.dto.UserRegistrationDto;
import com.authservice.auth.repository.UserRepository;
import com.authservice.auth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.validation.annotation.Validated;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/auth")
public class AuthController {
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody @Validated UserRegistrationDto userDto) {
        logger.info("Attempting to register user: {}", userDto.getUsername());

        if (userRepository.existsByUsername(userDto.getUsername())) {
            logger.warn("Registration attempt failed - User already exists: {}", userDto.getUsername());
            return ResponseEntity.badRequest().body("Error: User already exists - please log in.");
        }

        if (!userService.isValidEmail(userDto.getUsername())) {
            logger.warn("Registration attempt failed - Invalid email address: {}", userDto.getUsername());
            return ResponseEntity.badRequest().body("Error: Invalid email address.");
        }

        if (!userService.isValidPassword(userDto.getPassword())) {
            logger.warn("Registration attempt failed - Password does not meet strength requirements.");
            return ResponseEntity.badRequest().body("Error: Password does not meet strength requirements.");
        }

        // User creation and saving logic remains the same
        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        userRepository.save(user);
        
        logger.info("User registered successfully: {}", userDto.getUsername());
        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody User user) {
        User existingUser = userRepository.findByUsername(user.getUsername());

        if (existingUser != null && passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
            return ResponseEntity.ok("User authenticated.");
        } else {
            return ResponseEntity.status(401).body("Error: Invalid credentials.");
        }
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
}
