package com.authservice.auth;

import com.authservice.auth.model.User;
import com.authservice.auth.repository.UserRepository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    void testFindByUsername_ExistingUser_ReturnsUser() {
        // Arrange
        String username = "testuser";
        User user = new User();
        user.setUsername(username);
        userRepository.save(user);

        // Act
        User result = userRepository.findByUsername(username);

        // Assert
        assertNotNull(result);
        assertEquals(username, result.getUsername());
    }

    @Test
    void testFindByUsername_NonExistingUser_ReturnsNull() {
        // Arrange
        String username = "nonexistinguser";

        // Act
        User result = userRepository.findByUsername(username);

        // Assert
        assertNull(result);
    }

    @Test
    void testExistsByUsername_ExistingUser_ReturnsTrue() {
        // Arrange
        String username = "testuser";
        User user = new User();
        user.setUsername(username);
        userRepository.save(user);

        // Act
        boolean result = userRepository.existsByUsername(username);

        // Assert
        assertTrue(result);
    }

    @Test
    void testExistsByUsername_NonExistingUser_ReturnsFalse() {
        // Arrange
        String username = "nonexistinguser";

        // Act
        boolean result = userRepository.existsByUsername(username);

        // Assert
        assertFalse(result);
    }
}