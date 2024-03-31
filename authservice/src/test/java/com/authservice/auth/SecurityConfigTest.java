package com.authservice.auth;

import org.junit.jupiter.api.Test;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.authservice.auth.config.SecurityConfig;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class SecurityConfigTest {

    @Test
    void testPasswordEncoder() {
        SecurityConfig securityConfig = new SecurityConfig();
        BCryptPasswordEncoder passwordEncoder = securityConfig.passwordEncoder();

        // Check that the password encoder is not null
        assertNotNull(passwordEncoder, "Password encoder should not be null");
    }

    @Test
    void testFilterChain() throws Exception {
        SecurityConfig securityConfig = new SecurityConfig();
        HttpSecurity httpSecurity = mock(HttpSecurity.class);

        securityConfig.filterChain(httpSecurity);

        verify(httpSecurity).cors();
        verify(httpSecurity).csrf();
        verify(httpSecurity).authorizeRequests();
        verify(httpSecurity).httpBasic();
        verify(httpSecurity).sessionManagement();
        // Note: build() is not a method directly invoked on httpSecurity but a result of the configuration chain.
    }
}
