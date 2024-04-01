package com.authservice.auth;

import org.junit.jupiter.api.Test;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configurers.CorsConfigurer;
// import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
// import org.springframework.security.config.annotation.web.configurers.ExpressionUrlAuthorizationConfigurer;
// import org.springframework.security.config.annotation.web.configurers.HttpBasicConfigurer;
// import org.springframework.security.config.annotation.web.configurers.SessionManagementConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.authservice.auth.config.SecurityConfig;

// import static org.mockito.Mockito.atLeastOnce;
// import static org.mockito.Mockito.doNothing;
// import static org.mockito.Mockito.mock;
// import static org.mockito.Mockito.spy;
// import static org.mockito.Mockito.verify;
// import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class SecurityConfigTest {

    @Test
    void testPasswordEncoder() {
        SecurityConfig securityConfig = new SecurityConfig();
        BCryptPasswordEncoder passwordEncoder = securityConfig.passwordEncoder();

        // Check that the password encoder is not null
        assertNotNull(passwordEncoder, "Password encoder should not be null");
    }

//     @Test
//     void testFilterChain() throws Exception {
//         SecurityConfig securityConfig = new SecurityConfig();
//         HttpSecurity httpSecurity = mock(HttpSecurity.class);
    
//         // Mock methods to return httpSecurity for chaining unrelated calls
//         when(httpSecurity.cors().and()).thenReturn(httpSecurity);
//         when(httpSecurity.csrf().disable()).thenReturn(httpSecurity);
//         when(httpSecurity.httpBasic()).thenReturn(null); // Adjusted as per actual return types
//         when(httpSecurity.authorizeRequests()).thenReturn(null); // Adjusted
//         when(httpSecurity.sessionManagement()).thenReturn(null); // Adjusted
    
//         securityConfig.filterChain(httpSecurity);
    
//         // Verify interactions
//         verify(httpSecurity).cors().and();
//         verify(httpSecurity).csrf().disable();
//         verify(httpSecurity).authorizeRequests(); // Verify method was called
//         verify(httpSecurity).httpBasic(); // Verify method was called
//         verify(httpSecurity, atLeastOnce()).sessionManagement(); // Verify method was called
//     }    
 }
    