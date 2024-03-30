package com.authservice.auth.config;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static org.mockito.Mockito.verify;

class SecurityConfigTest {

    @InjectMocks
    private SecurityConfig securityConfig;

    @Mock
    private HttpSecurity httpSecurity;

    @Test
    void configure_shouldConfigureHttpSecurity() throws Exception {
        // Arrange
        MockitoAnnotations.openMocks(this);

        // Act
        securityConfig.configure(httpSecurity);

        // Assert
        verify(httpSecurity).cors();
        verify(httpSecurity).csrf();
        verify(httpSecurity).authorizeRequests();
        verify(httpSecurity).anyRequest();
        verify(httpSecurity).httpBasic();
    }

    @Test
    void passwordEncoder_shouldReturnBCryptPasswordEncoder() {
        // Arrange
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        // Act
        BCryptPasswordEncoder result = securityConfig.passwordEncoder();

        // Assert
        assertEquals(encoder.getClass(), result.getClass());
    }
}