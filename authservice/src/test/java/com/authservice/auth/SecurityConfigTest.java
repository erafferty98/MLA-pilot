package com.authservice.auth;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class SecurityConfigTest {

    @Autowired
    private MockMvc mockMvc;

    // Test that the public endpoints are accessible without authentication
    @Test
    public void givenPublicPaths_whenAccessWithoutAuthentication_thenOk() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/auth/signup"))
                .andExpect(status().isOk());

        mockMvc.perform(MockMvcRequestBuilders.get("/api/auth/login"))
                .andExpect(status().isOk());
    }

    // Test that a protected endpoint requires authentication
    @Test
    public void givenProtectedPath_whenAccessWithoutAuthentication_thenUnauthorized() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/protected"))
                .andExpect(status().isUnauthorized());
    }

    // Test that a protected endpoint is accessible with proper authentication
    @WithMockUser
    @Test
    public void givenProtectedPath_whenAccessWithAuthentication_thenOk() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/protected"))
                .andExpect(status().isOk());
    }
}