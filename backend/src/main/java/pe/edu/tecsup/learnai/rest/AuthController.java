package pe.edu.tecsup.learnai.rest;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.tecsup.learnai.entity.User;
import pe.edu.tecsup.learnai.exception.DuplicatedUserInfoException;
import pe.edu.tecsup.learnai.exception.InvalidTokenException;
import pe.edu.tecsup.learnai.rest.request.*;
import pe.edu.tecsup.learnai.services.EmailService;
import pe.edu.tecsup.learnai.services.UserService;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/auth")
public class AuthController{

    private final UserService userService;
    private final EmailService emailService;

    @Autowired
    public AuthController(UserService userService, EmailService emailService) {
        this.userService = userService;
        this.emailService = emailService;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        Optional<User> userOptional = userService.validEmailAndPassword(loginRequest.getEmail(), loginRequest.getPassword());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (!user.isVerified()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
            }
            return ResponseEntity.ok(new AuthResponse(user.getId(), user.getUsername(), user.getEmail()));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/register")
    public AuthResponse register(@Valid @RequestBody SignUpRequest signUpRequest) {
        if (userService.hasUserWithUsername(signUpRequest.getUsername())) {
            throw new DuplicatedUserInfoException(String.format("Username %s is already been used", signUpRequest.getUsername()));
        }
        if (userService.hasUserWithEmail(signUpRequest.getEmail())) {
            throw new DuplicatedUserInfoException(String.format("Email %s is already been used", signUpRequest.getEmail()));
        }

        User user = userService.saveUser(createUser(signUpRequest));
        emailService.sendWelcomeEmail(user.getEmail(), user.getUsername());
        return new AuthResponse(user.getId(), user.getUsername(), user.getEmail());
    }

    private User createUser(SignUpRequest signUpRequest) {
        User user = new User();
        user.setUsername(signUpRequest.getUsername());
        user.setPassword(signUpRequest.getPassword());
        user.setEmail(signUpRequest.getEmail());
        user.setVerificationToken(generateVerificationToken());
        user.setVerified(false);
        return user;
    }

    private String generateVerificationToken() {
        return UUID.randomUUID().toString();
    }

    @PutMapping("/verify")
    public ResponseEntity<String> verifyAccount(@RequestBody VerificationRequest verificationRequest) {
        if (verificationRequest.getToken() == null || verificationRequest.getToken().isEmpty()) {
            return ResponseEntity.badRequest().body("Verification token is missing or invalid.");
        }

        User user = userService.findByVerificationToken(verificationRequest.getToken())
                .orElseThrow(() -> new InvalidTokenException("Invalid verification token"));
        if (user.isVerified()) {
            return ResponseEntity.badRequest().body("Account is already verified.");
        }
        user.setVerified(true);
        userService.saveUser(user);
        return ResponseEntity.ok("Account verified successfully!");
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        emailService.sendPasswordResetLink(request.getEmail());
        return ResponseEntity.ok("Password reset link sent to your email!");
    }

    @PutMapping("/recover-password")
    public ResponseEntity<String> recoverPassword(@RequestBody RecoverPasswordRequest request) {
        userService.resetPassword(request.getToken(), request.getNewPassword());
        return ResponseEntity.ok("Password reset successfully!");
    }
}