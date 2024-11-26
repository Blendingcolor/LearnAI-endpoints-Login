package pe.edu.tecsup.learnai.runner;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import pe.edu.tecsup.learnai.entity.User;
import pe.edu.tecsup.learnai.services.UserService;

import java.util.Arrays;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Component
public class DatabaseInitializer implements CommandLineRunner {

    private final UserService userService;

    @Override
    public void run(String... args) {
        if (!userService.getUsers().isEmpty()) {
            return;
        }
        USERS.forEach(userService::saveUser);
        log.info("Database initialized with user data");
    }

    private static final List<User> USERS = Arrays.asList(
        new User("diego", "diego.becerra@example.com", "contra123", "token12345", true),
        new User("abel", "abel.santisteban@example.com", "contra456", "token67890", true),
        new User("jairo", "quispe.coa@example.com", "contra789", "token012345", true)
    );
}
