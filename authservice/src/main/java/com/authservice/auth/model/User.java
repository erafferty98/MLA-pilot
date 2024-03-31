package com.authservice.auth.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Represents a user in the system.
 */
@Document(collection = "users")
public class User {

    @Id
    private String id;
    private String username;
    private String password;

    /**
     * Default constructor.
     */
    public User() {
    }

    /**
     * Constructs a user with the specified username and password.
     *
     * @param username The username of the user.
     * @param password The password of the user.
     */
    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    /**
     * Gets the ID of the user.
     *
     * @return The ID of the user.
     */
    public String getId() {
        return id;
    }

    /**
     * Sets the ID of the user.
     *
     * @param id The ID of the user.
     */
    public void setId(String id) {
        this.id = id;
    }

    /**
     * Gets the username of the user.
     *
     * @return The username of the user.
     */
    public String getUsername() {
        return username;
    }

    /**
     * Sets the username of the user.
     *
     * @param username The username of the user.
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * Gets the password of the user.
     *
     * @return The password of the user.
     */
    public String getPassword() {
        return password;
    }

    /**
     * Sets the password of the user.
     *
     * @param password The password of the user.
     */
    public void setPassword(String password) {
        this.password = password;
    }
}
