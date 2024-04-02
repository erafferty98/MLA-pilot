package com.authservice.auth;

import com.authservice.auth.model.User;
import com.authservice.auth.repository.UserRepository;
import com.authservice.auth.service.UserService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        userService = new UserService(userRepository, passwordEncoder);
    }

    @Test
    void testIsValidEmail_ValidEmail_ReturnsTrue() {
        String email = "test@example.com";
        boolean result = userService.isValidEmail(email);
        assertTrue(result);
    }

    @Test
    void testIsValidEmail_InvalidEmail_ReturnsFalse() {
        String email = "invalid_email";
        boolean result = userService.isValidEmail(email);
        assertFalse(result);
    }

    @Test
    void testIsValidPassword_ValidPassword_ReturnsTrue() {
        String password = "Password123!";
        boolean result = userService.isValidPassword(password);
        assertTrue(result);
    }

    @Test
    void testIsValidPassword_InvalidPassword_ReturnsFalse() {
        String password = "weakpassword";
        boolean result = userService.isValidPassword(password);
        assertFalse(result);
    }

    @SuppressWarnings("null")
    @Test
    void testProcessOAuth2User_NewUser_ReturnsNewUser() {
        String email = "test@example.com";
        // ...

            User newUser = new User();
            newUser.setUsername(email);
            newUser.setPassword("A placeholder password");

            when(userRepository.findByUsername(email)).thenReturn(null);
            when(passwordEncoder.encode("A placeholder password")).thenReturn("encoded_password");
            when(userRepository.save(any(User.class))).thenReturn(newUser);

            User result = userService.processOAuth2User(createMockOAuth2User(email));

            assertNotNull(result);
            assertEquals(email, result.getUsername());
            assertEquals("encoded_password", result.getPassword());

        verify(userRepository).findByUsername(email);
        verify(passwordEncoder).encode("A placeholder password");
        verify(userRepository).save((User) any(User.class));
    }

    @Test
    void testProcessOAuth2User_ExistingUser_ReturnsExistingUser() {
        String email = "test@example.com";
        User existingUser = new User();
        existingUser.setUsername(email);

        when(userRepository.findByUsername(email)).thenReturn(existingUser);

        User result = userService.processOAuth2User(createMockOAuth2User(email));

        assertNotNull(result);
        assertEquals(existingUser, result);

        verify(userRepository).findByUsername(email);
        verifyNoMoreInteractions(userRepository);
        verifyNoInteractions(passwordEncoder);
    }

    private OAuth2User createMockOAuth2User(String email) {
        OAuth2User oAuth2User = mock(OAuth2User.class);
        when(oAuth2User.getAttribute("email")).thenReturn(email);
        return oAuth2User;
    }
}