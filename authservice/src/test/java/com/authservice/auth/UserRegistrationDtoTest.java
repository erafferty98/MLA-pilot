package com.authservice.auth;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import com.authservice.auth.dto.UserRegistrationDto;

public class UserRegistrationDtoTest {

    @Test
    public void testGetUsername() {
        String username = "test@example.com";
        UserRegistrationDto userRegistrationDto = new UserRegistrationDto();
        userRegistrationDto.setUsername(username);
        Assertions.assertEquals(username, userRegistrationDto.getUsername());
    }

    @Test
    public void testGetPassword() {
        String password = "password123";
        UserRegistrationDto userRegistrationDto = new UserRegistrationDto();
        userRegistrationDto.setPassword(password);
        Assertions.assertEquals(password, userRegistrationDto.getPassword());
    }

    @Test
    public void testEmptyConstructor() {
        UserRegistrationDto userRegistrationDto = new UserRegistrationDto();
        Assertions.assertNotNull(userRegistrationDto);
    }

    @Test
    public void testSetUsername() {
        String username = "test@example.com";
        UserRegistrationDto userRegistrationDto = new UserRegistrationDto();
        userRegistrationDto.setUsername(username);
        Assertions.assertEquals(username, userRegistrationDto.getUsername());
    }

    @Test
    public void testSetPassword() {
        String password = "password123";
        UserRegistrationDto userRegistrationDto = new UserRegistrationDto();
        userRegistrationDto.setPassword(password);
        Assertions.assertEquals(password, userRegistrationDto.getPassword());
    }
}