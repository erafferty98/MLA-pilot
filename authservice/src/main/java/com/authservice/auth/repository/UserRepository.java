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
     * @param username the username of the user to find
     * @return the found user, or null if no user is found
     */
    User findByUsername(String username);

    /**
     * Checks if a user with the given username exists.
     *
     * @param username the username to check
     * @return true if a user with the given username exists, false otherwise
     */
    boolean existsByUsername(String username);
}
