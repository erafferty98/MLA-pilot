package com.authservice.auth;

import org.junit.jupiter.api.Test;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.authservice.auth.config.SecurityConfig;

import static org.mockito.Mockito.atLeastOnce;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.spy;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
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
        String RETURNS_DEEP_STUBS;
        HttpSecurity httpSecurity = mock(HttpSecurity.class, RETURNS_DEEP_STUBS); // Use RETURNS_DEEP_STUBS for chaining

        when(httpSecurity.cors().and()).thenReturn(httpSecurity);
        when(httpSecurity.csrf().disable()).thenReturn(httpSecurity);
        when(httpSecurity.authorizeRequests()).thenReturn(httpSecurity);
        when(httpSecurity.httpBasic()).thenReturn(httpSecurity);
        when(httpSecurity.sessionManagement()).thenReturn(httpSecurity);

        securityConfig.filterChain(httpSecurity);

        // Verify interactions with mocked HttpSecurity object
        verify(httpSecurity).cors().and();
        verify(httpSecurity).csrf().disable();
        verify(httpSecurity).authorizeRequests().anyRequest().authenticated();
        verify(httpSecurity).httpBasic();
        verify(httpSecurity, atLeastOnce()).sessionManagement(); // Verifying it's called at least once
    }
}
    