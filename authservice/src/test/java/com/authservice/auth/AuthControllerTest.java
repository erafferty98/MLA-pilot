package com.authservice.auth;

import com.authservice.auth.controller.AuthController;
import com.authservice.auth.model.User;
import com.authservice.auth.dto.UserRegistrationDto;
import com.authservice.auth.repository.UserRepository;
import com.authservice.auth.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

class AuthControllerTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private UserService userService;

    @InjectMocks
    private AuthController authController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @SuppressWarnings("null")
    @Test
    void testRegisterUser_WithValidUserDto_ReturnsOkResponse() {
        // Arrange
        UserRegistrationDto userDto = new UserRegistrationDto();
        userDto.setUsername("testuser");
        userDto.setPassword("testpassword");

        when(userRepository.existsByUsername(anyString())).thenReturn(false);
        when(userService.isValidEmail(anyString())).thenReturn(true);
        when(userService.isValidPassword(anyString())).thenReturn(true);
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");

        // Act
        ResponseEntity<?> response = authController.registerUser(userDto);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("User registered successfully!", response.getBody());
        verify(userRepository, times(1)).save(any(User.class));
    }

    @SuppressWarnings("null")
    @Test
    void testRegisterUser_WithExistingUser_ReturnsBadRequestResponse() {
        // Arrange
        UserRegistrationDto userDto = new UserRegistrationDto();
        userDto.setUsername("existinguser");
        userDto.setPassword("testpassword");

        when(userRepository.existsByUsername(anyString())).thenReturn(true);

        // Act
        ResponseEntity<?> response = authController.registerUser(userDto);

        // Assert
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Error: User already exists - please log in.", response.getBody());
        verify(userRepository, never()).save(any(User.class));
    }

    // Add more test cases for other methods in AuthController

}