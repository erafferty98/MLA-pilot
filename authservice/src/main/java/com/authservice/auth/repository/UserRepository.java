package com.authservice.auth.repository;

import com.authservice.auth.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * The repository interface for managing User entities.
 */
public interface UserRepository extends MongoRepository<User, String> {
    /**
     * Finds a user by their username.
     *
     * @param username The username of the user to find.
     * @return The found user, or null if no user with the given username exists.
     */
    User findByUsername(String username);

    /**
     * Checks if a user with the given username exists.
     *
     * @param username The username to check.
     * @return true if a user with the given username exists, false otherwise.
     */
    boolean existsByUsername(String username);
}
