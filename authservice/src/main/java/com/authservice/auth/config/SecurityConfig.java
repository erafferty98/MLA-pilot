package com.authservice.auth.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

/**
 * This class is responsible for configuring the security settings of the application.
 * It enables web security and defines the security filter chain.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors().and() // Enable CORS (configure this based on your requirements)
                .csrf().disable() // Disable CSRF (enable and configure this in production)
                .authorizeRequests()
                .antMatchers("/api/auth/signup", "/api/auth/login").permitAll() // Public access to signup and login
                .anyRequest().authenticated() // All other requests need authentication
                .and()
                .httpBasic();
        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
