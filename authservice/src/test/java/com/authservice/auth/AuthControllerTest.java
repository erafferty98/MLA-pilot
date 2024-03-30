package com.authservice.auth;

import com.authservice.auth.controller.AuthController;
import com.authservice.auth.dto.UserRegistrationDto;
import com.authservice.auth.model.User;
import com.authservice.auth.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.mockito.Mockito.when;

@WebMvcTest(AuthController.class)
public class AuthControllerTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private AuthController authController;

    private MockMvc mockMvc;

    public AuthControllerTest() {
        MockitoAnnotations.openMocks(this);
    }

    @SuppressWarnings("null")
    @Test
    public void testRegisterUser() throws Exception {
        UserRegistrationDto userDto = new UserRegistrationDto();
        userDto.setUsername("testuser");
        userDto.setPassword("testpassword");

        when(userRepository.existsByUsername("testuser")).thenReturn(false);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(userDto)))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("User registered successfully!"));
    }

    @SuppressWarnings("null")
    @Test
    public void testAuthenticateUser() throws Exception {
        User user = new User();
        user.setUsername("testuser");
        user.setPassword("testpassword");

        when(userRepository.findByUsername("testuser")).thenReturn(user);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(user)))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("User authenticated"));
    }

    @Test
    public void testForgotPassword() throws Exception {
        String username = "testuser";

        when(userRepository.findByUsername("testuser")).thenReturn(new User());

        mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/forgot-password")
                .param("username", username))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("Reset password link sent to your email"));
    }

    @Test
    public void testLogoutUser() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/logout"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("User logged out successfully!"));
    }

    @Test
    public void testSignupWithGoogle() throws Exception {
        String googleAccessToken = "testtoken";

        mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/signup-with-google")
                .param("googleAccessToken", googleAccessToken))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("User signed up with Google"));
    }
}