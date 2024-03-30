package com.authservice.auth.service;

import com.authservice.auth.model.User;
import com.authservice.auth.repository.UserRepository;
import org.passay.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.oauth2.core.user.OAuth2User;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public boolean isValidEmail(String email) {
        try {
            InternetAddress internetAddress = new InternetAddress(email);
            internetAddress.validate();
            return true;
        } catch (AddressException e) {
            return false;
        }
    }

    public boolean isValidPassword(String password) {
        PasswordValidator validator = new PasswordValidator(
            new LengthRule(8, 30),
            new CharacterRule(EnglishCharacterData.UpperCase, 1),
            new CharacterRule(EnglishCharacterData.LowerCase, 1),
            new CharacterRule(EnglishCharacterData.Digit, 1),
            new CharacterRule(EnglishCharacterData.Special, 1)
        );

        RuleResult result = validator.validate(new PasswordData(password));
        return result.isValid();
    }

    /**
     * Processes the OAuth2User details after login with an external OAuth2 provider such as Google.
     * This method could either create a new user in your system based on the OAuth2 details or
     * update an existing user.
     *
     * @param oAuth2User The OAuth2 user information.
     * @return The processed or newly created user.
     */
    public User processOAuth2User(OAuth2User oAuth2User) {
        String email = oAuth2User.getAttribute("email");
        User existingUser = userRepository.findByUsername(email);

        if (existingUser == null) {
            // Create a new user
            User newUser = new User();
            newUser.setUsername(email);

            // Handle setting a non-null password or using a placeholder if your User entity requires a password
            newUser.setPassword(passwordEncoder.encode("A placeholder password"));

            userRepository.save(newUser);
            return newUser;
        } else {
            // Update existing user details if necessary
            // For example, update the profile picture URL
            return existingUser;
        }
    }
}
