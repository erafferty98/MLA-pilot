package com.authservice.auth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * The main class for the authentication service.
 */
@SpringBootApplication
@EnableWebMvc
public class AuthApplication {

	/**
	 * The main method that starts the authentication service.
	 *
	 * @param args The command line arguments.
	 */
	public static void main(String[] args) {
		SpringApplication.run(AuthApplication.class, args);
	}

	/**
	 * Creates a bean for the password encoder.
	 *
	 * @return The password encoder bean.
	 */
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	/**
	 * Creates a bean for configuring CORS (Cross-Origin Resource Sharing).
	 *
	 * @return The WebMvcConfigurer bean for CORS configuration.
	 */
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(@SuppressWarnings("null") CorsRegistry registry) {
				registry.addMapping("/**")
						.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
						.allowedHeaders("*")
						.allowedOrigins("*");
			}
		};
	}
}