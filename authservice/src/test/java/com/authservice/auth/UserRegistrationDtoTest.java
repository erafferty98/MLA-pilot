package com.authservice.auth;

import com.authservice.auth.dto.UserRegistrationDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import javax.validation.ConstraintViolation;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

public class UserRegistrationDtoTest {

    private Validator validator;

    @BeforeEach
    public void setup() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    void testGettersAndSetters() {
        String username = "test@example.com";
        String password = "password123";
        UserRegistrationDto userRegistrationDto = new UserRegistrationDto();

        userRegistrationDto.setUsername(username);
        userRegistrationDto.setPassword(password);

        assertEquals(username, userRegistrationDto.getUsername());
        assertEquals(password, userRegistrationDto.getPassword());
    }

    @Test
    void testNotBlankUsername() {
        UserRegistrationDto userRegistrationDto = new UserRegistrationDto();
        userRegistrationDto.setUsername(""); // Blank username

        Set<ConstraintViolation<UserRegistrationDto>> violations = validator.validate(userRegistrationDto);
        assertFalse(violations.isEmpty());
    }

    @Test
    void testNotBlankPassword() {
        UserRegistrationDto userRegistrationDto = new UserRegistrationDto();
        userRegistrationDto.setPassword(""); // Blank password

        Set<ConstraintViolation<UserRegistrationDto>> violations = validator.validate(userRegistrationDto);
        assertFalse(violations.isEmpty());
    }

    @Test
    void testValidEmailUsername() {
        UserRegistrationDto userRegistrationDto = new UserRegistrationDto();
        userRegistrationDto.setUsername("invalid-email");

        Set<ConstraintViolation<UserRegistrationDto>> violations = validator.validate(userRegistrationDto);
        assertFalse(violations.isEmpty()); // Expect validation errors due to invalid email format
    }

    @Test
    void testMinimumPasswordLength() {
        UserRegistrationDto userRegistrationDto = new UserRegistrationDto();
        userRegistrationDto.setPassword("short");

        Set<ConstraintViolation<UserRegistrationDto>> violations = validator.validate(userRegistrationDto);
        assertFalse(violations.isEmpty()); // Expect validation errors due to short password length
    }
}