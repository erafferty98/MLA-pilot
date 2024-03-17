package com.authservice.auth.repository;

import com.authservice.auth.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.dao.DuplicateKeyException;

import java.util.HashSet;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

@DataMongoTest
public class UserRepositoryTests {

    @Autowired
    private UserRepository userRepository;

    private User user;

    @BeforeEach
    void setUp() {
        userRepository.deleteAll();

        // Setup a test user
        user = new User("testUser", "test@example.com", "password");
        user.setRoles(new HashSet<>(java.util.Collections.singletonList("ROLE_USER")));
    }

    @Test
    void testSaveAndFindUserByUsername() {
        userRepository.save(user);
        Optional<User> foundUser = userRepository.findByUsername(user.getUsername());
        assertThat(foundUser).isPresent();
        assertThat(foundUser.get().getUsername()).isEqualTo(user.getUsername());
    }

    @Test
    void testDuplicateUsernameThrowsException() {
        userRepository.save(user);
        assertThrows(DuplicateKeyException.class, () -> {
            userRepository.save(new User("testUser", "test2@example.com", "password2"));
        });
    }

    @Test
    void testExistsByUsername() {
        userRepository.save(user);
        boolean exists = userRepository.existsByUsername(user.getUsername());
        assertThat(exists).isTrue();
    }
}
