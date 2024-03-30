package com.authservice.auth;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;

@SpringJUnitConfig
@SpringBootTest
public class AuthApplicationTest {

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    public void testPasswordEncoder() {
        String password = "password";
        String encodedPassword = passwordEncoder.encode(password);
        assert passwordEncoder.matches(password, encodedPassword);
    }

    @Test
    public void testCorsConfiguration() throws Exception {
        @SuppressWarnings("null")
        MockMvc mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext)
                .apply(springSecurity())
                .build();

        mockMvc.perform(MockMvcRequestBuilders.options("/api/auth/signup"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.header().string("Access-Control-Allow-Origin", "*"))
                .andExpect(MockMvcResultMatchers.header().string("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"))
                .andExpect(MockMvcResultMatchers.header().string("Access-Control-Allow-Headers", "*"));
    }
}