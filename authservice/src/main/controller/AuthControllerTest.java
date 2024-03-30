import com.authservice.auth.controller.AuthController;
import com.authservice.auth.model.User;
import com.authservice.auth.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class AuthControllerTest {

    @InjectMocks
    private AuthController authController;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void registerUser_shouldReturnBadRequestWhenUserExists() {
        // Arrange
        User user = new User();
        user.setUsername("existingUser");
        when(userRepository.existsByUsername(user.getUsername())).thenReturn(true);

        // Act
        ResponseEntity<?> response = authController.registerUser(user);

        // Assert
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("User already exists - please log in", response.getBody());
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void registerUser_shouldReturnOkWhenUserDoesNotExist() {
        // Arrange
        User user = new User();
        user.setUsername("newUser");
        when(userRepository.existsByUsername(user.getUsername())).thenReturn(false);
        when(passwordEncoder.encode(user.getPassword())).thenReturn("encodedPassword");

        // Act
        ResponseEntity<?> response = authController.registerUser(user);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("User registered successfully!", response.getBody());
        verify(userRepository).save(user);
    }

    @Test
    void authenticateUser_shouldReturnOkWhenCredentialsAreValid() {
        // Arrange
        User user = new User();
        user.setUsername("existingUser");
        user.setPassword("password");
        User existingUser = new User();
        existingUser.setUsername("existingUser");
        existingUser.setPassword("encodedPassword");
        when(userRepository.findByUsername(user.getUsername())).thenReturn(existingUser);
        when(passwordEncoder.matches(user.getPassword(), existingUser.getPassword())).thenReturn(true);

        // Act
        ResponseEntity<?> response = authController.authenticateUser(user);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("User authenticated", response.getBody());
    }

    @Test
    void authenticateUser_shouldReturnUnauthorizedWhenCredentialsAreInvalid() {
        // Arrange
        User user = new User();
        user.setUsername("existingUser");
        user.setPassword("wrongPassword");
        User existingUser = new User();
        existingUser.setUsername("existingUser");
        existingUser.setPassword("encodedPassword");
        when(userRepository.findByUsername(user.getUsername())).thenReturn(existingUser);
        when(passwordEncoder.matches(user.getPassword(), existingUser.getPassword())).thenReturn(false);

        // Act
        ResponseEntity<?> response = authController.authenticateUser(user);

        // Assert
        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assertEquals("Invalid credentials", response.getBody());
    }
}@Test
void registerUser_shouldReturnBadRequestWhenUserExists() {
    // Arrange
    User user = new User();
    user.setUsername("existingUser");
    when(userRepository.existsByUsername(user.getUsername())).thenReturn(true);

    // Act
    ResponseEntity<?> response = authController.registerUser(user);

    // Assert
    assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    assertEquals("User already exists - please log in", response.getBody());
    verify(userRepository, never()).save(any(User.class));
}

@Test
void registerUser_shouldReturnOkWhenUserDoesNotExist() {
    // Arrange
    User user = new User();
    user.setUsername("newUser");
    when(userRepository.existsByUsername(user.getUsername())).thenReturn(false);
    when(passwordEncoder.encode(user.getPassword())).thenReturn("encodedPassword");

    // Act
    ResponseEntity<?> response = authController.registerUser(user);

    // Assert
    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertEquals("User registered successfully!", response.getBody());
    verify(userRepository).save(user);
}

@Test
void authenticateUser_shouldReturnOkWhenCredentialsAreValid() {
    // Arrange
    User user = new User();
    user.setUsername("existingUser");
    user.setPassword("password");
    User existingUser = new User();
    existingUser.setUsername("existingUser");
    existingUser.setPassword("encodedPassword");
    when(userRepository.findByUsername(user.getUsername())).thenReturn(existingUser);
    when(passwordEncoder.matches(user.getPassword(), existingUser.getPassword())).thenReturn(true);

    // Act
    ResponseEntity<?> response = authController.authenticateUser(user);

    // Assert
    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertEquals("User authenticated", response.getBody());
}

@Test
void authenticateUser_shouldReturnUnauthorizedWhenCredentialsAreInvalid() {
    // Arrange
    User user = new User();
    user.setUsername("existingUser");
    user.setPassword("wrongPassword");
    User existingUser = new User();
    existingUser.setUsername("existingUser");
    existingUser.setPassword("encodedPassword");
    when(userRepository.findByUsername(user.getUsername())).thenReturn(existingUser);
    when(passwordEncoder.matches(user.getPassword(), existingUser.getPassword())).thenReturn(false);

    // Act
    ResponseEntity<?> response = authController.authenticateUser(user);

    // Assert
    assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
    assertEquals("Invalid credentials", response.getBody());
}

@Test
void forgotPassword_shouldReturnOkWhenUsernameIsValidEmail() {
    // Arrange
    String username = "validemail@example.com";
    User user = new User();
    user.setUsername(username);
    user.setEmail(username);
    when(userRepository.findByUsername(username)).thenReturn(user);

    // Act
    ResponseEntity<?> response = authController.forgotPassword(username);

    // Assert
    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertEquals("Password reset instructions sent to your email", response.getBody());
    verify(userRepository).findByUsername(username);
    verify(authController).sendPasswordResetEmail(username);
}

@Test
void forgotPassword_shouldReturnBadRequestWhenUsernameIsInvalidEmail() {
    // Arrange
    String username = "invalidemail";
    User user = new User();
    user.setUsername(username);
    when(userRepository.findByUsername(username)).thenReturn(user);

    // Act
    ResponseEntity<?> response = authController.forgotPassword(username);

    // Assert
    assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    assertEquals("Invalid username format. Please enter a valid email address.", response.getBody());
    verify(userRepository).findByUsername(username);
    verify(authController, never()).sendPasswordResetEmail(anyString());
}

@Test
void forgotPassword_shouldReturnNotFoundWhenUserDoesNotExist() {
    // Arrange
    String username = "nonexistentuser";
    when(userRepository.findByUsername(username)).thenReturn(null);

    // Act
    ResponseEntity<?> response = authController.forgotPassword(username);

    // Assert
    assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    assertEquals("User not found. Please create a new account with your email.", response.getBody());
    verify(userRepository).findByUsername(username);
    verify(authController, never()).sendPasswordResetEmail(anyString());
}