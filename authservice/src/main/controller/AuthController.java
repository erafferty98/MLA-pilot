package com.authservice.auth.controller;

import com.authservice.auth.model.User;
import com.authservice.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity; // Add missing import statement
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

/**
 * The AuthController class handles the authentication and registration of users.
 * It provides endpoints for user registration, user login, and forgot password.
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

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestParam String username) {
        User user = userRepository.findByUsername(username);

        if (user != null) {
            if (isValidEmail(user.getEmail())) {
                // Logic to send password reset email with a link to set a new password
                sendPasswordResetEmail(user.getEmail());
                return ResponseEntity.ok("Password reset instructions sent to your email");
            } else {
                return ResponseEntity.badRequest().body("Invalid username format. Please enter a valid email address.");
            }
        } else {
            return ResponseEntity.status(404).body("User not found. Please create a new account with your email.");
        }
    }

    private boolean isValidEmail(String email) {
        // Return true if the email is valid, false otherwise
        String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
        return email.matches(emailRegex);
    }

    private void sendPasswordResetEmail(String email) {
        // Implement password reset emailing using JavaMail API:
        try {
            // Create a JavaMail session
            Session session = Session.getInstance(new Properties());

            // Create a message
            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress("noreply@example.com"));
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(email));
            message.setSubject("Password Reset");
            message.setText("Please click on the link to reset your password.");

            // Send the message
            Transport.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
